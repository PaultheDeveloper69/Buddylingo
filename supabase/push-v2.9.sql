-- BuddyLingo v2.9 — the data push
-- Run this ONCE in the Supabase SQL editor, before uploading prototype/.
--
-- Three jobs: clear out the fake accounts, correct Ameni's settings, and register
-- Lover Language and Words of Affirmation as real selectable languages.
--
-- Safe to run twice: every statement is a no-op the second time.

begin;

-- ═══════════════════════════════════════════════════════════════════════════
-- 1. THE FAKE ACCOUNTS
-- ═══════════════════════════════════════════════════════════════════════════
-- The two test accounts from the 17th. They are flagged is_bot, so the app
-- already hides them — but they still HOLD slots 2 and 3, which is why there is
-- no open slot left for the fourth person. Deleting the auth user cascades to
-- fighters, fighter_languages, front_snapshots, front_state, rivals and
-- challenges, so nothing of them survives anywhere.
delete from auth.users
where id in (
  '80d678fd-4a13-43a3-a075-0dea4640a1f6',  -- Test User 1, slot 2, fr
  '43333687-8436-4fbc-920b-8d062b6ed193'   -- Test User 2, slot 3, el
);

-- Any other bot that ever gets created: same treatment, by FLAG rather than by
-- name, so this stays correct without editing ids.
delete from auth.users
where id in (select user_id from fighters where is_bot = true);

-- ═══════════════════════════════════════════════════════════════════════════
-- 2. AMENI'S ACCOUNT
-- ═══════════════════════════════════════════════════════════════════════════
-- fighter_languages.is_primary defaults to false, and the client was not
-- overriding it on registration — so Ameni (and anyone enlisted after the v8
-- migration) reads as a SECONDARY side of themselves everywhere downstream.
-- A fighter's only language is always their primary one.
update fighter_languages fl
   set is_primary = true
 where not fl.is_primary
   and 1 = (select count(*) from fighter_languages x where x.user_id = fl.user_id);

-- And the language they enlisted with stays primary even once they open more.
update fighter_languages fl
   set is_primary = true
  from fighters f
 where f.user_id = fl.user_id
   and f.language_id = fl.language_id
   and not fl.is_primary;

-- ═══════════════════════════════════════════════════════════════════════════
-- 3. LOVER LANGUAGE + WORDS OF AFFIRMATION AS REAL LANGUAGES
-- ═══════════════════════════════════════════════════════════════════════════
-- Both already publish into `standings` under these ids. Until now the languages
-- table had no row for either, so the app had to either hide them or draw them as
-- unnamed grey lanes. Registering them makes them selectable, named and coloured
-- everywhere, and lets the server switch them on and off like any other language.
--
-- deck_size is the scenario count, not a word count — these two are scored in
-- scenarios (see bl-langs.js `unit`).
insert into languages (id, name, color, active, deck_size, native_name, code, sort)
values
  ('ll', 'Lover Language',      '#6d4aa8', true, 32, 'Lover Language',      'LL', 60),
  ('wa', 'Words of Affirmation','#9c6d3f', true, 11, 'Words of Affirmation','WA', 70)
on conflict (id) do update
  set name        = excluded.name,
      color       = excluded.color,
      active      = excluded.active,
      deck_size   = excluded.deck_size,
      native_name = excluded.native_name,
      code        = excluded.code,
      sort        = excluded.sort;

commit;

-- ═══════════════════════════════════════════════════════════════════════════
-- CHECKS — run these after, they should read exactly like the comments say
-- ═══════════════════════════════════════════════════════════════════════════
-- Three fighters, no bots, one primary language each:
--   select slot, name, language_id, known, bonus from standings order by slot;
--
-- Ameni's flag repaired (expect is_primary = true):
--   select f.name, fl.language_id, fl.is_primary
--     from fighter_languages fl join fighters f on f.user_id = fl.user_id
--    order by f.name;
--
-- Seven languages, ll and wa active:
--   select id, name, active, deck_size, sort from languages order by sort;
