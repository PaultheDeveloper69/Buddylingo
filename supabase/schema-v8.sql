-- v8 — EXPANSION (2026-08-19)
-- Prepares the live database for: more than ten accounts, one account holding
-- several languages, a nemesis per language, the Vocab Map challenge layer, bot
-- accounts flagged instead of name-matched, and snapshot retention.
-- Additive and idempotent — existing progress is never touched.
--
-- HOW TO RUN: supabase.com -> project "buddylingo" -> SQL Editor -> New query ->
-- paste this whole file -> Run. Green "Success" = done.

-- ---------------------------------------------------------------- 1 · accounts
-- slot was capped at 0..9, so registration number eleven had nowhere to go.
-- Slot stays unique (it is the public ordinal on the login grid) but unbounded.
-- the 0..9 range check was created inline in schema-v2, so its name is whatever
-- Postgres generated. Dropping a guessed name silently succeeds and leaves the
-- cap in place, so find every check constraint on slot and drop it by name.
do $$
declare c text;
begin
  for c in select conname from pg_constraint
           where conrelid = 'fighters'::regclass and contype = 'c'
             and pg_get_constraintdef(oid) ilike '%slot%'
  loop execute format('alter table fighters drop constraint %I', c); end loop;
end $$;
create unique index if not exists fighters_slot_unique on fighters (slot);

-- bots are flagged, not detected by name (a real fighter called Tessa used to
-- vanish from the arena because the client filtered /^test/i).
alter table fighters add column if not exists is_bot boolean not null default false;
update fighters set is_bot = true where name ~* '^test' and is_bot = false;

-- --------------------------------------------------------------- 2 · languages
-- The registry the client mirrors in bl-langs.js. `active` is what gates a
-- language on the login grid, so a new language can be opened without a push.
alter table languages add column if not exists native_name text;
alter table languages add column if not exists code text;
alter table languages add column if not exists sort int not null default 100;

insert into languages (id, name, color, active, deck_size, native_name, code, sort) values
  ('fr', 'Français', '#d62828', true,  1059, 'Le Français', 'FR', 10),
  ('el', 'Ελληνικά', '#2160a8', true,  967,  'Τα Ελληνικά', 'EL', 20),
  ('de', 'Deutsch',  '#8a6a1f', true,  1000, 'Deutsch',     'DE', 30),
  -- Spanish and Tunisian stay dormant: listed on the grid, not claimable yet
  ('es', 'Español',  '#c2571d', false, 1000, 'El Español',  'ES', 40),
  ('tn', 'Tounsi',   '#2a8c46', false, 1000, 'Tounsi',      'TN', 50)
on conflict (id) do update
  set name = excluded.name, color = excluded.color, active = excluded.active,
      deck_size = excluded.deck_size, native_name = excluded.native_name,
      code = excluded.code, sort = excluded.sort;

-- ------------------------------------------------- 3 · one fighter, N languages
-- A fighters row carries ONE language_id, and standings used to join snapshots
-- on (user_id AND language_id) — so a second language was silently dropped from
-- the ladder, the front and the faction totals. This table is the real link.
create table if not exists fighter_languages (
  user_id     uuid references auth.users on delete cascade not null,
  language_id text references languages not null,
  is_primary  boolean not null default false,
  joined_at   timestamptz not null default now(),
  primary key (user_id, language_id)
);
alter table fighter_languages enable row level security;
drop policy if exists "fighter languages readable by all" on fighter_languages;
create policy "fighter languages readable by all" on fighter_languages for select using (true);
drop policy if exists "own fighter language insert" on fighter_languages;
create policy "own fighter language insert" on fighter_languages for insert with check (auth.uid() = user_id);
drop policy if exists "own fighter language update" on fighter_languages;
create policy "own fighter language update" on fighter_languages for update using (auth.uid() = user_id);

-- backfill: the language each fighter registered with is their primary
insert into fighter_languages (user_id, language_id, is_primary)
  select user_id, language_id, true from fighters
on conflict (user_id, language_id) do update set is_primary = true;

-- backfill: every language anyone has ever published a snapshot for
-- (only where real progress exists: visiting another deck once published a
-- known=0 row, and those must not become territory on the ladder or the map)
insert into fighter_languages (user_id, language_id)
  select distinct s.user_id, s.language_id from front_snapshots s
  where s.known > 0
    and exists (select 1 from languages l where l.id = s.language_id)
on conflict (user_id, language_id) do nothing;

-- and enrol automatically from now on, so picking up a language needs no client
create or replace function enrol_language() returns trigger as $$
begin
  -- a known=0 snapshot means the deck was merely opened, not studied
  if coalesce(new.known, 0) > 0 then
    insert into fighter_languages (user_id, language_id)
      values (new.user_id, new.language_id)
    on conflict (user_id, language_id) do nothing;
  end if;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists trg_enrol_language on front_snapshots;
create trigger trg_enrol_language
  after insert on front_snapshots
  for each row execute function enrol_language();

-- ------------------------------------------------------------------- 4 · views
-- latest_fronts now pins world='daily': NANI publishing later must not shadow
-- the daily number. standings is rebuilt on fighter_languages.
drop view if exists language_totals;
drop view if exists standings;
drop view if exists latest_fronts;

create view latest_fronts as
  select distinct on (user_id, language_id)
    user_id, language_id, known, bonus, cat_known, known_mask, computed_at
  from front_snapshots
  where coalesce(world, 'daily') = 'daily'
  order by user_id, language_id, computed_at desc;

create view standings as
  select f.slot, f.name, fl.language_id, f.user_id,
         coalesce(l.known, 0) as known,
         coalesce(l.bonus, 0) as bonus,
         coalesce(l.cat_known, '{}'::jsonb) as cat_known,
         l.known_mask,
         l.computed_at,
         fl.is_primary,
         f.is_bot
  from fighters f
  join fighter_languages fl on fl.user_id = f.user_id
  left join latest_fronts l on l.user_id = f.user_id and l.language_id = fl.language_id;

create view language_totals as
  select language_id,
         sum(known)::int as known,
         sum(bonus)::int as bonus,
         count(*)::int as fighters
  from standings
  where not is_bot
  group by language_id;

grant select on latest_fronts, standings, language_totals to anon, authenticated;
grant select, insert, update on fighter_languages to authenticated;

-- ------------------------------------------------------------------ 5 · rivals
-- One nemesis per person was global: declaring a rival in German overwrote the
-- French one. The pick is now per language.
alter table rivals add column if not exists language_id text not null default '';
update rivals r set language_id = coalesce(
    nullif(r.language_id, ''),
    (select f.language_id from fighters f where f.user_id = r.user_id),
    'fr')
  where r.language_id = '';
alter table rivals drop constraint if exists rivals_pkey;
alter table rivals add constraint rivals_pkey primary key (user_id, language_id);

-- -------------------------------------------------------------- 6 · challenges
-- The Vocab Map's declarations of war. A challenge banks each side's count at
-- signing, so only words learned inside the term decide it. Public: the whole
-- map is supposed to see who declared whom.
create table if not exists challenges (
  id              bigint generated always as identity primary key,
  challenger      uuid references auth.users on delete cascade not null,
  target          uuid references auth.users on delete cascade not null,
  language_id     text not null,
  term_days       int  not null default 7 check (term_days in (3, 7)),
  started_at      timestamptz not null default now(),
  base_challenger int  not null default 0,
  base_target     int  not null default 0,
  settled_at      timestamptz,
  winner          uuid,
  margin          int,
  forfeited_by    uuid,
  check (challenger <> target)
);
alter table challenges enable row level security;
drop policy if exists "challenges readable by all" on challenges;
create policy "challenges readable by all" on challenges for select using (true);
drop policy if exists "declare own challenge" on challenges;
create policy "declare own challenge" on challenges for insert with check (auth.uid() = challenger);
-- either side may settle or forfeit the one they are in
drop policy if exists "settle own challenge" on challenges;
create policy "settle own challenge" on challenges for update
  using (auth.uid() = challenger or auth.uid() = target);

create index if not exists challenges_open
  on challenges (language_id, challenger) where settled_at is null;
create index if not exists challenges_target on challenges (target);

-- ------------------------------------------------------------- 7 · retention
-- front_snapshots is append-only and every save adds a row. Keep the newest per
-- (fighter, language) forever, keep one row per day as history, drop the rest
-- once it is a month old. Call it from the SQL editor or a scheduled job.
create or replace function prune_front_snapshots() returns int as $$
declare n int;
begin
  with keep as (
    select distinct on (user_id, language_id) id from front_snapshots
    order by user_id, language_id, computed_at desc
  ), daily as (
    select min(id) as id from front_snapshots
    group by user_id, language_id, date_trunc('day', computed_at)
  )
  delete from front_snapshots f
   where f.computed_at < now() - interval '30 days'
     and f.id not in (select id from keep)
     and f.id not in (select id from daily);
  get diagnostics n = row_count;
  return n;
end;
$$ language plpgsql security definer;

-- verify: this MUST come back empty. Any row here is a surviving slot cap, and
-- registration will fail at that number however green the rest of the run looked.
select conname, pg_get_constraintdef(oid) as still_capping
  from pg_constraint
  where conrelid = 'fighters'::regclass and contype = 'c'
    and pg_get_constraintdef(oid) ilike '%slot%';

-- verify
select 'fighters' as t, count(*) from fighters
union all select 'fighter_languages', count(*) from fighter_languages
union all select 'standings rows', count(*) from standings
union all select 'languages active', count(*) from languages where active;
