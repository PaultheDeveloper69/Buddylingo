# BuddyLingo — Engineering Handoff

For the next assistant/model taking over. Read fully before touching anything.
Owner: Paul (admin). Second user: Nando. Live at https://buddylingo.de (GitHub Pages).

## What this is
A vocabulary-battle web app: languages are factions, foods are mascots.
French (Paul) vs Greek (Nando) is the ONLY live battle. German/Spanish/Tunisian
exist as finished apps but are LOCKED ("coming soon") — do not activate without Paul.

## Repositories & services
- GitHub: PaultheDeveloper69/Buddylingo (public, main). Pages ON, main//(root),
  custom domain buddylingo.de (GoDaddy DNS: 4 A records → GitHub, CNAME www).
  index.html at root redirects to prototype/Full App.dc.html.
  Paul edits ONLY via GitHub upload (no code tools). Always give him drag-and-drop
  upload instructions (Add file → Upload files → drag folders → commit).
- Supabase: project "buddylingo". Ran: schema.sql (v1), schema-v2.sql (v2, idempotent).
  MUST STILL RUN: supabase/schema-v3.sql (public roster read + unique slot index).
- The project folder repo/ is always the upload package mirror. After ANY app edit,
  refresh the matching file under repo/prototype/ and offer the package as download.

## File map (prototype/)
- Full App.dc.html — entry (start → login; continue-as if session exists)
- BuddyLingo Login.dc.html — 10 fighter slots, claim-once (name+lang+4-digit PIN),
  DE/ES/TN rows locked. Server roster merge + slot-collision auto-slide (see below).
- Vocab French.dc.html / Vocab Greek.dc.html — the two live apps. Same engine:
  SRS boxes IV[7], adaptive pace, tier jumps, campaign card (CEFR bars),
  Front Line card (5 category tug bars: Overall/Nouns/Verbs/Adjectives/Phrases
  + animated food-mob face-off), streak, badges, missions, heatmap, lexicon.
- French extras: conjugation tables (window.FR.conj), NANI Work world toggle
  (in-place, no reload; separate save nani-fr-v1). Greek: friend's original deck,
  GERMAN prompt keys, dialect field in save.
- Vocab German/Spanish/Tunisian.dc.html — complete but locked. TN has NANI world too.
- Vocab War.dc.html — Europe/N-Africa map (assets/map-europe.png), homelands,
  adjacency conquest, pure rules in war-rules.js. PARKED: "coming soon" per Paul;
  no links to it from apps/login right now.
- deck.js (FR, 543 lemmas, 6 tiers) · greek-deck.js (EL, 439, 5 tiers, German keys)
  · deck-de/es/tn.js · nani-work.js (100 factory concepts, FR+TN adapters)
- war-config/content/rules.js — canonical concept layer + deterministic rules
- bl-config.js — Supabase URL + anon key placeholders (SEE OPEN TASK 1)
- bl-sync.js — server layer: claim-once auth (synthetic email f<slot>.<slugname>
  @buddylingo.app, password bl-<pin>-<slugname>), roster fetch, front_snapshots
  push/read, slot-collision register (returns {slotTaken, next})
- support.js — DC runtime, never edit

## Storage contract (CRITICAL — never break)
- Per-fighter saves: vocab-fr-v1[:slot], vocab-el-v1[:slot], nani-fr-v1[:slot]…
  (slot suffix from bl-session). NEVER write another page's save. War/battle
  layers READ saves, write only their own keys (bl-war-v1, bl-roster-v1, bl-session).
- Save payload includes catKnown {B,N,V,A,total} — Greek/French write it for the
  rival's Front Line card.
- Canonical origin: every page redirects www.buddylingo.de → buddylingo.de
  (storage split fix). Keep that script in any new page.

## Deck editing rules (bugs happened here)
- Entries: ["english key", "target (nouns WITH article)", "forms/pron", "N|V|A|B"].
  English key = unique ID; NEVER duplicate, never change existing keys.
- After ANY deck edit: parse-validate exactly like a browser
  (new Function("window", src))(w) and count entries. A single missing comma
  crashed production once (v2.1 → v2.1.1 hotfix).
- Expansion plan (uploads PDF, extracted/expansion-plan.txt): grow in validated
  waves of ~100 toward 24 tiers × 100 = 2,400 lemmas/language; lemmas not
  inflections; frequency-selected, pedagogy-sequenced; no giant one-shot passes.

## Design system (docs/DESIGN-PROMPT-PACK.md has the full version)
- Paper #f6f4ef, ink sketch characters on pure white + mix-blend-mode:multiply,
  accents: FR #d62828 · EL #2160a8 · DE #946f00 · ES #c2571d · TN #2a8c46,
  gold #b08d3f/#f2c94c. Fonts: Gloock (display) + Figtree. No emoji in UI chrome.
- Character gen: Higgsfield tools (nano_banana_pro + croissant style ref,
  seedance_2_5 mode omni_reference for 5s idle loops; demand full body + pure
  white bg; videos must be muted — a MutationObserver force-mutes in DE/ES/TN).
- Inline styles only in DC templates; only @font-face/@keyframes/body resets in helmet.

## OPEN ASSIGNMENT (in priority order)
1. FINISH SUPABASE WIRING (code is built, unconfigured):
   a. Get from Paul: Supabase Project URL + anon public key (dashboard → Settings
      → API). Insert into bl-config.js (both project root AND repo/prototype/).
   b. Paul must run supabase/schema-v3.sql in SQL Editor (public roster read +
      unique fighters_slot_unique index).
   c. Paul must disable email confirmation: Authentication → Sign In/Providers →
      Email → "Confirm email" OFF (accounts use synthetic emails).
   d. Package → Paul uploads prototype/ + supabase/ to GitHub.
   e. TEST (Paul asked for this explicitly — stress test before push):
      create account phone → login desktop (server roster shows the slot,
      PIN verified server-side); Paul+Nando both grab slot 1 simultaneously
      (one must auto-slide, DB index is the referee); wrong PIN shake;
      offline claim still enters app (5s fallback); front_snapshots rows appear
      after answers (1.5s debounce after save); FR app shows EL's server totals
      and vice versa. Simulate what's simulatable; give Paul a phone checklist.
2. Word-level cross-device sync (word_state/review_events tables exist; apps
   currently sync only battle totals). Design: append review events with UUID
   idempotency (see extracted/war-map-brief.txt — server-authoritative doctrine).
3. Deck waves toward 1,000 (expansion plan), Greek adjective re-tag (its "A"
   category is thin → Adjectives front reads near 0 for Greece).
4. Root URL polish: Paul dislikes the long path — consider making index.html
   the Full App itself or a cleaner /app/ path.
5. Croissant hero GIF expired (FR splash uses static sway fallback). Regenerate
   via Higgsfield (style prompts in DESIGN-PROMPT-PACK.md) or ask Paul for the GIF.
6. Later: war map revival (rules/simulator ready), war report after sessions,
   Cypriot delta layer (~480 contrasts, native-verified), TestFlight once
   Apple approves Paul's developer account.

## Working style Paul expects
- He is non-technical: number every clickable step, say which button, which tab.
- He uploads via GitHub web UI only. Always hand him a fresh package (repo/) and
  exact drag-and-drop instructions. Keep github.md's Last sync updated.
- Small targeted changes; verify decks parse; no destructive resets of saves;
  admin-only controls (no public reset buttons); no audio ever; no secrets in HTML.
