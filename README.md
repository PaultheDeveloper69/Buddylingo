# BuddyLingo

Private invite-only vocabulary trainer. Several fighters, several languages, one
shared learning engine, and a competitive layer on top of it — the duel, the
front, the ladder and the Vocab Map.

Live at **buddylingo.de**. The entry point is `index.html`, which redirects to
`prototype/Full App.dc.html`.

## Status

- **HTML prototype in `prototype/` is the product** — it is what is deployed and
  what people use, not a mockup. Open the `.dc.html` files directly in a browser.
- React Native app: not started. Stack decided: Expo + React Native +
  TypeScript + Supabase.

## Who is playing

Four human slots (`BL_CONFIG.alphaSlots`), three claimed: Paul on French, Nancop
on Greek, Ameni on German. One open. Slot count is a product gate only — the
database stopped capping accounts in schema-v8.

## Languages

Seven registered in `bl-langs.js`, which mirrors the `languages` table. A
language is playable when it is `active` there, so one can be switched on from
the server without a push.

| id | Language | State | Scored in |
| --- | --- | --- | --- |
| `fr` | Français | live | words |
| `el` | Ελληνικά | live | words |
| `de` | Deutsch | live | words |
| `es` | Español | dormant | words |
| `tn` | Tounsi | dormant | words |
| `ll` | Lover Language | live | scenarios |
| `wa` | Words of Affirmation | live | scenarios |

`ll` and `wa` are `kind: "skill"` — they rank on the same road as the countries
and appear in every switcher, but hold no territory on the map, because there is
no country to colour in. Both are fully translated into German alongside English
(43 scenarios).

## Repo layout

- `prototype/` — the deployed app. One `.dc.html` per screen, plus `bl-*.js`
  (registry, config, sync, arena, front logic) and the deck content files.
- `supabase/` — schema migrations in order, `schema.sql` → `schema-v8.sql`, plus
  the data push `push-v2.9.sql`. Run them in the Supabase SQL editor.
- `docs/ENGINE_SPEC.md` — the vocabulary learning engine
- `docs/ROADMAP.md` — build & launch plan
- `data/` — the raw French and Greek decks as JSON

## Rules

- **Learning progress is important data: no destructive DB operations.** Every
  migration is additive and idempotent.
- The `service_role` key never ships in the app. Only the anon publishable key
  does, and Row Level Security is what makes that safe.
- Invite-only. No public signup.
- One flag, `BL_CONFIG.previewData`, separates the design copy from the deployed
  one: **true** in the design workspace turns on preview fighters and filler
  data so screens can be judged with no server behind them, **false** here. The
  deployed app shows real rows or an honest empty state — never a person who
  does not exist. It is the only line that differs between the two copies.
