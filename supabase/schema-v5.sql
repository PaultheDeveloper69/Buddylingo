-- v5 — TWO LAYERS, deliberately separate. Additive; safe to run twice.
--
--   MASTER  word_states       one row per fighter per language. The authoritative
--                             per-word record: every card with its box, due date,
--                             reps, misses and hot state. PRIVATE (owner only).
--                             Upserted, never appended. A monotonic `rev` makes
--                             stale writes impossible.
--
--   SUB     front_snapshots   append-only derived counts (known, cat_known, mask)
--                             read PUBLICLY for the ladder, duel and front line.
--
-- They can never contradict each other because sub is only ever DERIVED from
-- master at push time and carries the same rev. If they ever disagree, master
-- wins by definition and the next push rewrites sub. Nothing reads sub for your
-- own restore, and nothing writes master from sub.

-- 1 · MASTER
create table if not exists word_states (
  user_id     uuid not null references auth.users on delete cascade,
  language_id text not null,
  rev         bigint not null default 0,       -- monotonic; client sends Date.now()
  cards       jsonb  not null default '{}'::jsonb,
  known       int    not null default 0,
  known_mask  text,
  cat_known   jsonb  not null default '{}'::jsonb,
  xp          int    not null default 0,
  stats       jsonb  not null default '{}'::jsonb,
  badges      jsonb  not null default '{}'::jsonb,
  days        jsonb  not null default '{}'::jsonb,
  tier_floor  int    not null default 0,
  updated_at  timestamptz not null default now(),
  primary key (user_id, language_id)
);

alter table word_states enable row level security;

-- master is private: only its owner can see or touch it
drop policy if exists "own master read" on word_states;
create policy "own master read" on word_states for select using (auth.uid() = user_id);
drop policy if exists "own master insert" on word_states;
create policy "own master insert" on word_states for insert with check (auth.uid() = user_id);
drop policy if exists "own master update" on word_states;
create policy "own master update" on word_states for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- 2 · NO-REGRESS GUARD — the reason the two layers can never clobber each other.
-- An update carrying an older or equal rev is silently kept as the existing row,
-- so a stale device (offline tab, second browser) can never roll progress back.
create or replace function word_states_no_regress() returns trigger as $$
begin
  if new.rev <= old.rev then
    return old;
  end if;
  new.updated_at := now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_word_states_no_regress on word_states;
create trigger trg_word_states_no_regress
  before update on word_states
  for each row execute function word_states_no_regress();

-- 3 · never lose words to a truncated write: a push whose card count drops by
-- more than half is treated as corrupt and rejected outright.
create or replace function word_states_no_truncate() returns trigger as $$
declare old_n int; new_n int;
begin
  old_n := coalesce(jsonb_object_keys_count(old.cards), 0);
  new_n := coalesce(jsonb_object_keys_count(new.cards), 0);
  if old_n > 8 and new_n * 2 < old_n then
    return old;
  end if;
  return new;
end;
$$ language plpgsql;

-- helper the guard above needs (jsonb has no built-in key count)
create or replace function jsonb_object_keys_count(j jsonb) returns int as $$
  select case when j is null then 0 else (select count(*)::int from jsonb_object_keys(j)) end;
$$ language sql immutable;

drop trigger if exists trg_word_states_no_truncate on word_states;
create trigger trg_word_states_no_truncate
  before update on word_states
  for each row execute function word_states_no_truncate();

-- 4 · index for the one query the app makes
create index if not exists word_states_owner on word_states (user_id, language_id);

grant select, insert, update on word_states to authenticated;
