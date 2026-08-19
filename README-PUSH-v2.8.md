# BuddyLingo v2.8 — The Expansion Update

Push packet. Two steps, in this order: **Supabase first, files second.**

Everything in `prototype/` is a plain text file. No new images, fonts or decks —
the art already on the site is unchanged, so nothing else needs uploading.

---

## 1 · Supabase (do this BEFORE the files go up)

Open supabase.com → project **buddylingo** → SQL Editor → New query → paste the
whole of `supabase/schema-v8.sql` → Run.

It is additive and safe to run twice. No existing progress is touched: it only
adds columns, tables, views and guards.

What it does:

| Change | Why |
| --- | --- |
| Drops the 0–9 cap on `fighters.slot` | Registration used to fail at fighter eleven |
| Adds `fighters.is_bot` (Test User rows flagged) | Bots were hidden by matching names — a real "Tessa" would have vanished |
| Seeds the `languages` registry (de active, es/tn dormant) | German goes live; the client mirrors this table |
| Adds `fighter_languages` + auto-enrol trigger | One account can now hold several languages and be seen in all of them |
| Rebuilds `latest_fronts` / `standings` / `language_totals` | Standings used to drop a fighter's second language; daily and work worlds no longer mix |
| `rivals` primary key → (user_id, language_id) | Declaring a nemesis in German used to overwrite the French one |
| Adds `challenges` | The Vocab Map's declarations of war and their results |
| Adds `prune_front_snapshots()` | Snapshot history grows forever otherwise; call it whenever you like |

### Check the run worked

The script ends with a verify block. Read both results:

1. **The slot-cap query must return NO ROWS.** If a row comes back, the 0–9 cap
   survived and registration will fail again at that number — tell me and I will
   fix it by name.
2. The counts query should show your fighters, one `fighter_languages` row per
   fighter per language actually studied, the standings rows, and 3 active
   languages.

Nothing else to configure. Keys, RLS and email confirmation are unchanged.

---

## 2 · Files (after the SQL is in)

Upload the contents of `prototype/` into `prototype/` in the repo, replacing the
existing files.

**Pages (7)**

- `BuddyLingo Login.dc.html` — human-only slot budget (bots no longer eat it), German claimable, "enlisting only works on buddylingo.de" note
- `Vocab French.dc.html`, `Vocab Greek.dc.html` — many wars at once, the map as a fold-out inside Le Duel, no zero-score publishing
- `Vocab German.dc.html`, `Vocab Spanish.dc.html`, `Vocab Tunisian.dc.html` — now publish and restore from the server, and carry the Arena card
- `Vocab Map.dc.html` — the rumble road, live standings, wars, challenges

**Scripts (7)**

- `bl-langs.js` *(new)* — the one language registry, mirrors the `languages` table
- `bl-page-sync.js` *(new)* — one publish/restore path for every language page
- `bl-arena.js` *(new)* — who else is fighting, and your declared wars
- `bl-sync.js` — v8 shapes, per-language rivals, challenges, velocities, enlisting gated to the live domain
- `bl-config.js` — `alphaSlots: 4` (two open slots) and `lockedLangs: []`
- `bl-front.js` — unchanged in this bundle, included so the set is complete
- `bl-release.js` — the 2.8 what's-new popup (fires once per fighter)

Not in this packet because nothing changed: the decks (`deck.js`,
`greek-deck.js`, `deck-de.js`, `deck-es.js`, `deck-tn.js`), `nani-work.js`,
`bl-sound.js`, and everything under `assets/`.

---

## 3 · After the push (five minutes)

1. Open the site on your phone, sign in as **Paul**, and let a session save.
   The duel card should say "yours published just now".
2. Check the Vocab Map (button inside Le Duel): the header should read
   "live · 2 fighters · 2 languages · +2 preview" until the friends join.
3. On the login grid you should see exactly **two** "Open slot · tap to enlist"
   cards. Send the link to the two friends; they pick a name, a language
   (Français, Ελληνικά or Deutsch) and a PIN.
4. Once they have learned their first words, the preview languages on the map
   disappear on their own and the road fills with real sides.

### If something looks wrong

- **Scores not moving on the ladder** — the duel card carries a sync-health line;
  red means this device is not publishing. Tap "switch fighter" and sign in again.
- **A friend cannot claim a slot** — they must be on buddylingo.de, not a preview
  link. Enlisting is deliberately blocked everywhere else so the open slots
  cannot be burned by accident.
- **Someone shows up with 0 points in a language they never study** — should be
  impossible now (zero snapshots are no longer published and no longer enrol a
  language), but tell me if you see it.
- **A wrong score published** — the rollback guard rejects drops over 30%, and
  `word_states` keeps the word-exact record, so nothing is lost.

### Want more people or languages later

- More slots: raise `alphaSlots` in `bl-config.js`. The database no longer caps it.
- Spanish or Tunisian: set `active = true` for that row in the `languages` table
  (or flip `active` in `bl-langs.js`). Both pages are already wired.
- A brand-new language: one row in `bl-langs.js`, one deck file, one page, five
  character PNGs. Nothing else — that was the point of this update.
