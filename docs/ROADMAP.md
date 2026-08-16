# BuddyLingo — Real App Roadmap (V1 → App Store)

STATUS DASHBOARD: "Project — Build & Launch.dc.html" is the live admin page (phases, statuses, MY ACTION REQUIRED, decisions log). Keep it updated every working session.
Engine v2 spec (from uploads/research.pdf, user-approved 2026-08-15): FSRS-style D/S/R scheduler (90% target retention, no fixed ladder) · per-channel mastery staged recognition → typed production → gender drill → collocation/cloze games (vocab volume first, games unlock when a word is solid in writing) · accent-tolerant + synonym-tolerant answer checker · structured gender/POS (derivable from deck strings: "le/la X", "l'X (m/f)") · immutable review-event log · semantic spacing of new-word batches · backlog recovery · dashboard split receptive vs active counts · NO audio yet (no audio source). These land in the RN engine, not the HTML prototype (user: prototype is good enough as proof of concept).

User-provided checklist for turning the HTML prototype into a production Expo / React Native / TypeScript app with Supabase. Kept verbatim as the build plan for the developer handoff once the V1 design is final.

## Phases
1. Build the French trainer first (Expo/RN/TS, GitHub, nav, vocab storage, sessions, mastery, spaced repetition, XP, streaks, daily goals, stats)
2. Supabase project + connect app (anon key only in app, never service-role)
3. Supabase Auth login system — two pre-created accounts (Paul/French, Alex/Greek), display name + language per account
4. NO public registration — accounts created manually, invite-only
5. Login screen: email/username + password, hidden chars, loading, wrong-password/unknown-user/no-internet errors, Logout in Settings
6. Entire app gated behind auth (login screen vs main app; check on launch)
7. Session persistence: stay logged in until Logout (app lock / FaceID optional later, not V1)
8. profiles table: id (= auth user id), display_name, language, avatar, created_at
9. ALL progress keyed by user_id (vocabulary, reviews, daily_stats, streaks tables)
10. Auto-save everything (reviews, mastery, XP, streak, settings); delete app → reinstall → login → all progress returns
11. Row Level Security: users can only touch their own rows
12. Competition exception: shared read of display name, avatar, language, XP, streak, words learned, weekly score, achievements — NOT full vocab/history
13. Test account switching thoroughly on one phone
14. Test on two physical phones simultaneously (competition sync both ways)
15. Finish debugging French (hundreds of words, offline states, reinstall/restore)
16. Add Greek as language=greek in the SAME app/codebase (Greek keyboard/characters)
17. Ship: Expo EAS, production builds, Apple Developer, App Store Connect, TestFlight, prod Supabase + env vars
18. Update workflow: change → run locally → test both users → GitHub → push build → both phones update

## Notes for handoff
- The HTML prototype (Vocabulaire Supérieur / Inférieur .dc.html) is the spec: spaced-repetition intervals, XP values, ranks, badges, missions/weapons, adaptive difficulty, battle scoring (1 pt/word known + 25 pts/weapon).
- Food-character design system: black ink + warm white + one accent per language (French red #d62828, Greek blue #2160a8); the food IS the body; large illustration mode vs small icon mode. See uploads/ChatGPT Image Aug 15 2026 (style sheet) + scratch/characters.html (SVG sources).
- The prototype's dual-cache localStorage battleground maps to phases 9/12 (Supabase shared competition stats).
