-- v7 — FINAL CLEANUP (2026-08-18)
-- Removes the corrupt snapshots a stale logged-in device pushed on Aug 17
-- (Paul/fr rolled to 57; guard + domain gate arrived after they landed).
-- Deletes ONLY those junk rows — no real progress is touched. Idempotent.
--
-- RUN: supabase.com → project "buddylingo" → SQL Editor → paste → Run.

delete from front_snapshots
  where user_id = '205695c6-3487-41b6-acba-4be6b94a9521'
    and language_id = 'fr' and known = 57;

-- safety net: same junk under any other language for the same device burst
delete from front_snapshots
  where user_id = '205695c6-3487-41b6-acba-4be6b94a9521'
    and computed_at >= '2026-08-17T19:29:00Z' and computed_at < '2026-08-17T19:43:00Z';

-- verify (should show 125/fr for Paul until his phone republishes as Paul):
select user_id, language_id, known, bonus, computed_at from latest_fronts;
