-- BuddyLingo schema v2 (ADDITIVE — run after schema.sql; safe to re-run)
-- Adds: language registry (dormant languages slumber with active=false),
-- per-user fighters (login slots), and front-line snapshots for FR vs EL battle.

create table if not exists languages (
  id text primary key,                 -- fr, el, de, es, tn
  name text not null,
  color text not null,
  active boolean not null default false, -- launch: only fr + el
  deck_size int not null default 0
);
insert into languages (id, name, color, active, deck_size) values
  ('fr', 'Français',  '#d62828', true,  500),
  ('el', 'Ελληνικά',  '#2160a8', true,  367),
  ('de', 'Deutsch',   '#946f00', false, 200),
  ('es', 'Español',   '#c2571d', false, 200),
  ('tn', 'Tounsi',    '#2a8c46', false, 100)
on conflict (id) do update
  set name = excluded.name, color = excluded.color,
      active = excluded.active, deck_size = excluded.deck_size;
alter table languages enable row level security;
drop policy if exists "languages are public" on languages;
create policy "languages are public" on languages for select using (true);

-- one row per login slot (mirrors the prototype's 10-fighter roster)
create table if not exists fighters (
  user_id uuid references auth.users on delete cascade not null,
  slot int not null check (slot between 0 and 9),
  name text not null,
  language_id text references languages not null,
  world text not null default 'daily' check (world in ('daily','work')),
  created_at timestamptz default now(),
  primary key (user_id, slot)
);
alter table fighters enable row level security;
drop policy if exists "own fighters read" on fighters;
create policy "own fighters read"  on fighters for select using (auth.uid() = user_id);
drop policy if exists "own fighters write" on fighters;
create policy "own fighters write" on fighters for insert with check (auth.uid() = user_id);
drop policy if exists "own fighters update" on fighters;
create policy "own fighters update" on fighters for update using (auth.uid() = user_id);

-- append-only front-line snapshots: each device posts its own counts;
-- the battle bar reads the LATEST snapshot per (user, language, world).
create table if not exists front_snapshots (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users on delete cascade not null,
  language_id text references languages not null,
  world text not null default 'daily',
  known int not null default 0,
  cat_known jsonb not null default '{}',  -- {"B":n,"N":n,"V":n,"A":n,"total":n}
  computed_at timestamptz default now()
);
alter table front_snapshots enable row level security;
drop policy if exists "fronts readable by all" on front_snapshots;
create policy "fronts readable by all" on front_snapshots for select using (true);
drop policy if exists "write own front" on front_snapshots;
create policy "write own front" on front_snapshots for insert with check (auth.uid() = user_id);
create index if not exists front_latest on front_snapshots (language_id, world, computed_at desc);
