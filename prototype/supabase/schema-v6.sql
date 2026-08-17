-- v6 — CATCH-UP + ROLLBACK GUARD (2026-08-17)
-- Diagnosis: the live database was still on v3 (+ v5 word_states). v4 was never
-- applied, so snapshots carry NO weapons (bonus) and no masks — each phone
-- showed the rival with "no weapons". Also, at 19:30 UTC a device with a stale
-- partial save rolled Paul's public fr score from 125 down to 57 (append-only
-- + newest-wins had no guard). This file fixes all of it. Idempotent.
--
-- HOW TO RUN: supabase.com → project "buddylingo" → SQL Editor → New query →
-- paste this whole file → Run. Green "Success" = done.

-- 1 · v4 catch-up: weapons + masks travel with snapshots
alter table front_snapshots add column if not exists known_mask text;
alter table front_snapshots add column if not exists bonus int not null default 0;

create or replace view latest_fronts as
  select distinct on (user_id, language_id)
    user_id, language_id, known, bonus, cat_known, known_mask, computed_at
  from front_snapshots
  order by user_id, language_id, computed_at desc;

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

create or replace view language_totals as
  select language_id,
         sum(known)::int as known,
         sum(bonus)::int as bonus,
         count(*)::int as fighters
  from standings
  group by language_id;

grant select on latest_fronts, standings, language_totals to anon, authenticated;

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

create index if not exists front_user_lang_latest
  on front_snapshots (user_id, language_id, computed_at desc);

-- 2 · ROLLBACK GUARD on snapshots. Small dips are legitimate (words lapse:
-- 131 → 125 was real); a drop of more than 30% against the current public
-- number is a stale or truncated save and is silently skipped — the score
-- keeps its ground, the stale device does no harm.
create or replace function front_snapshots_no_rollback() returns trigger as $$
declare cur int;
begin
  select known into cur from front_snapshots
    where user_id = new.user_id and language_id = new.language_id
    order by computed_at desc limit 1;
  if cur is not null and cur > 20 and new.known * 10 < cur * 7 then
    return null; -- skipped, no error: reads still work, score unharmed
  end if;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists trg_front_no_rollback on front_snapshots;
create trigger trg_front_no_rollback
  before insert on front_snapshots
  for each row execute function front_snapshots_no_rollback();

-- 3 · heal the damage already done: remove the two corrupt 57-word snapshots
-- pushed at 19:30 UTC on 2026-08-17, so the duel shows 125 again immediately
-- (and Paul's real 184+ the moment his phone publishes successfully).
delete from front_snapshots
  where language_id = 'fr' and known = 57
    and computed_at >= '2026-08-17T19:29:00Z' and computed_at < '2026-08-17T19:31:00Z';
