# BuddyLingo v2.9 — The Data Push

Real data only, Ameni's account corrected, and Lover Language promoted to a
selectable language.

Two steps, **SQL first**.

---

## Step 1 — run the SQL

Open the Supabase SQL editor and run **`supabase/push-v2.9.sql`** whole. It is
idempotent, so a second run changes nothing.

It does three things:

**Clears the fake accounts.** The two Test User accounts from the 17th are
flagged `is_bot` and already hidden in the app, but they still *hold slots 2 and
3* — which is why no slot was left open for the fourth person. Deleting the auth
user cascades to fighters, languages, snapshots, front state, rivals and
challenges, so nothing of them survives. Any future bot goes the same way, by
flag rather than by name.

**Corrects Ameni's account.** `fighter_languages.is_primary` defaults to false
and the client wasn't overriding it on registration, so Ameni — and anyone
enlisted after the v8 migration — read as a *secondary* side of themselves
everywhere downstream. Repaired for her and for everyone after her, and the
client no longer creates the problem (see below).

**Registers Lover Language and Words of Affirmation.** Both already published
into `standings`; the `languages` table simply had no row for either, so the app
had to hide them or draw them as unnamed grey lanes. Now they are real rows the
server can switch on and off like any other language.

### After it runs

```sql
select slot, name, language_id, known, bonus from standings order by slot;
select id, name, active, deck_size, sort from languages order by sort;
```

Expect **three fighters** (Paul, Nancop, Ameni), no bots, one open slot, and
**seven languages** with `ll` and `wa` active.

---

## Step 2 — upload `prototype/`

Everything in `prototype/` replaces its counterpart. `previewData` is already
**false** in this copy.

---

## What changed

### No invented data reaches the published app

`bl-config.js` carries one flag, `previewData` — **true** in the design copy,
**false** here. It is the single gate on every invented thing: the synthetic
roster, the filler language lanes, the seeded scroll archive, the sandbox day
controls, the "Viewing as" row. With it off the app shows live rows or an honest
empty card, never a person who does not exist. That is the one line that differs
between the two copies.

### A score is words known

Mission points are no longer added into the score anywhere. Four weapon badges
are worth 100, which on a fighter's first day was double their word count —
that is where German's 129 and Ameni's 153 came from. Nothing was invented; the
arithmetic was wrong. Scores now read as words (or scenarios), with mission
points reported alongside, and the duel card prints the split under each number
so any total can be accounted for.

### Lover Language is a selectable language

Registered in `bl-langs.js` with its own name, colour, page, save key, deck and
character art, and `kind: "skill"` — it ranks on the same road as the countries
and appears in every switcher, but claims no territory, because there is no
country to colour in. Its lane is tagged `skill` on the map. Words of
Affirmation is registered the same way.

New registry fields, both read everywhere instead of being hardcoded:

- `kind` — `"country"` or `"skill"`
- `unit` — what one point of `known` is: countries count **words**, skills count
  **scenarios**

### The app entry could not route to Lover Language

`Full App.dc.html` — what `index.html` redirects to — carried a hardcoded
five-language route map and never loaded the registry at all. A fighter on any
language outside that literal had no way through the front door: "Continue" fell
back to the login page. It now reads routes from `bl-langs.js`, and the
live/coming-soon line is generated from the same source so it cannot drift.

### The login grid offered one slot too many

The alpha budget was handed out by grid *position* — the first N squares — so a
fighter who registered further down the grid left an extra square claimable
behind them. Ameni registered into slot 4, which left slots 2 **and** 3 open on a
four-slot alpha. It now counts the humans who exist and opens only the
difference, wherever the gaps fall.

### Registration sets `is_primary`

`register()` now passes `is_primary: true` for the language a fighter enlists
with. Opening a second language never demotes the first.

### The sync warning clears itself

On a session mismatch the client used to sign itself out. The Supabase session
is shared across tabs, so two tabs signed each other out in a loop and the
"not reaching the server" warning never cleared. It now refuses the push without
destroying the session, names the real cause, and retries on focus and on any
auth change in another tab.

### Vocab Lover

- **32 scenarios**, up from 16 — including five trap profiles (respond and the
  panel slams red with a siren and names the tells you walked past) and three
  hidden gems (respond and it goes green: *freak in the sheets*, go soldier).
  The read is graded on its own: right read is full marks, walking into a trap
  is a miss, not a near miss.
- **29 generated profile photos**, one per illustrated card, each carrying its
  written tell.
- **German**: all 32 scenarios translated — situations, prompts, every question,
  every option with its verdict note, the build slots, the reveals, and all
  trap/gem copy. Verified to keep the English structure exactly, so a German
  round grades identically. The toggle previously did nothing on load (the saved
  language never reached the deck); fixed.
- **Rapid fire**, a third mode: six seconds a line, picks first and typing at
  higher levels, timing out ends the run.
- Performance: two hardcoded stalls per exchange removed, the round is
  prefetched instead of compiled on the first tap of start, and the queue
  builder dropped an O(n²) scan.
- Fast answers are timed from when the decision appears, not from when the round
  mounts — the metric that feeds the Quick Wit mission now measures reaction.
- The progress bar no longer retreats when a session grows.
- Court Round loads standalone (it never loaded its own scenario engine).

---

## Still outstanding from v2.8

Nothing. `supabase/schema-v8.sql` is on `main` with its real content.
`schema-v8.1.sql` remains optional; it quiets the security-definer view
warnings and the app works either way.

## Known gaps

None outstanding. Both modes are fully translated — 43 scenarios, verified to
keep the English structure exactly, so a German round grades identically.
