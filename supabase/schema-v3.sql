-- v3: the fighter roster (names, slots, languages) is public info for the login grid.
drop policy if exists "own fighters read" on fighters;
drop policy if exists "fighters readable by all" on fighters;
create policy "fighters readable by all" on fighters for select using (true);

-- one fighter per slot, enforced by the database (collision-proof)
create unique index if not exists fighters_slot_unique on fighters (slot);
