-- BuddyLingo schema v1 (run in Supabase SQL editor)
-- Two invite-only users; all progress keyed by auth user id. RLS on everything.

create table profiles (
  id uuid primary key references auth.users on delete cascade,
  display_name text not null,
  language text not null check (language in ('fr','el')),
  created_at timestamptz not null default now()
);

create table review_events (
  id bigint generated always as identity primary key,
  user_id uuid not null references profiles(id) on delete cascade,
  word_id text not null,
  channel text not null check (channel in ('recognition','production','gender','context')),
  grade text not null check (grade in ('again','hard','good','easy')),
  elapsed_ms integer,
  created_at timestamptz not null default now()
);
create index on review_events (user_id, word_id, channel);

create table word_state (
  user_id uuid not null references profiles(id) on delete cascade,
  word_id text not null,
  channel text not null,
  difficulty real not null default 5,
  stability real not null default 0,
  last_review timestamptz,
  due timestamptz,
  primary key (user_id, word_id, channel)
);

create table daily_activity (
  user_id uuid not null references profiles(id) on delete cascade,
  day date not null,
  reviews integer not null default 0,
  new_words integer not null default 0,
  xp integer not null default 0,
  goal_met boolean not null default false,
  primary key (user_id, day)
);

create table achievements (
  user_id uuid not null references profiles(id) on delete cascade,
  key text not null,
  earned_at timestamptz not null default now(),
  primary key (user_id, key)
);

-- Shared subset for Le Duel: both users may READ these rows, only owner may write.
create table duel_stats (
  user_id uuid primary key references profiles(id) on delete cascade,
  display_name text not null,
  language text not null,
  xp integer not null default 0,
  streak integer not null default 0,
  words_known integer not null default 0,
  weekly_score integer not null default 0,
  week_start date,
  updated_at timestamptz not null default now()
);

alter table profiles enable row level security;
alter table review_events enable row level security;
alter table word_state enable row level security;
alter table daily_activity enable row level security;
alter table achievements enable row level security;
alter table duel_stats enable row level security;

create policy "own profile" on profiles for all using (auth.uid() = id) with check (auth.uid() = id);
create policy "own events" on review_events for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own state" on word_state for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own activity" on daily_activity for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own achievements" on achievements for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
-- duel: everyone authenticated can read, only owner writes
create policy "duel read all" on duel_stats for select using (auth.role() = 'authenticated');
create policy "duel write own" on duel_stats for insert with check (auth.uid() = user_id);
create policy "duel update own" on duel_stats for update using (auth.uid() = user_id);
