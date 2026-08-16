# BuddyLingo

Private two-user vocabulary trainer: French (Paul) and Greek (Alex). One shared learning engine, per-language configuration, friendly competition ("Le Duel").

## Status
- HTML prototype (the product spec) lives in `prototype/` — open the .dc.html files in the Claude design workspace.
- React Native app: not started. Stack decided: Expo + React Native + TypeScript + Supabase.

## Repo layout
- `prototype/` — working HTML prototype (spec for XP values, ranks, missions, duel scoring, UI)
- `docs/ENGINE_SPEC.md` — vocabulary learning engine v2 (research-based)
- `docs/ROADMAP.md` — build & launch plan
- `data/deck-fr.json` — 507 French words (EN→FR), 5 tiers
- `data/deck-el.json` — 367 Greek words (DE→EL), 4 tiers
- `supabase/schema.sql` — database schema + Row Level Security, ready for the Supabase SQL editor

## Rules
- Learning progress is important data: no destructive DB operations.
- The service_role key never ships in the app; only the publishable key does.
- Two invite-only accounts; no public signup.
