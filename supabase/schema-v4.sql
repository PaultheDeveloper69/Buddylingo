-- v4 — four fighters, three languages, two scoring frames. Everything here is
-- ADDITIVE: existing rows, policies and app versions keep working untouched.
-- Safe to run twice.

-- 1 · per-word masks on snapshots (nullable; old rows stay valid)
alter table front_snapshots add column if not exists known_mask text;
alter table front_snapshots add column if not exists bonus int not null default 0;

-- 2 · one current row per fighter per language
create or replace view latest_fronts as
  select distinct on (user_id, language_id)
    user_id, language_id, known, bonus, cat_known, known_mask, computed_at
  from front_snapshots
  order by user_id, language_id, computed_at desc;

-- 3 · the standings the app reads: fighter identity + their current numbers
create or replace view standings as
  select f.slot, f.name, f.language_id, f.user_id,
         coalesce(l.known, 0) as known,
         coalesce(l.bonus, 0) as bonus,
         coalesce(l.cat_known, '{}'::jsonb) as cat_known,
         l.known_mask,
         l.computed_at
  from fighters f
  left join latest_fronts l
    on l.user_id = f.user_id and l.language_id = f.language_id;

-- 4 · faction totals (numbers are meant to count: a two-person team is stronger)
create or replace view language_totals as
  select language_id,
         sum(known)::int as known,
         sum(bonus)::int as bonus,
         count(*)::int as fighters
  from standings
  group by language_id;

grant select on latest_fronts, standings, language_totals to anon, authenticated;

-- 5 · rivals — one declared nemesis each, public so "X is gunning for you" works
create table if not exists rivals (
  user_id uuid primary key references auth.users on delete cascade,
  rival_user_id uuid references auth.users on delete cascade,
  updated_at timestamptz default now()
);
alter table rivals enable row level security;
drop policy if exists "rivals readable by all" on rivals;
create policy "rivals readable by all" on rivals for select using (true);
drop policy if exists "write own rival" on rivals;
create policy "write own rival" on rivals for insert with check (auth.uid() = user_id);
drop policy if exists "update own rival" on rivals;
create policy "update own rival" on rivals for update using (auth.uid() = user_id);

-- 6 · snapshots are append-only per push; keep reads on the latest fast
create index if not exists front_user_lang_latest
  on front_snapshots (user_id, language_id, computed_at desc);
