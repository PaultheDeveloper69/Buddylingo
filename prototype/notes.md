# French trainer build notes
Source app (unpacked to extracted/template.html — full DC template + logic):
- German UI, German→Greek flashcards. W = ~390 entries [de, greek, translit, cat N/V/B]. CONJ table for verbs (present/aorist/future, 6 persons, regular derivation + irregulars).
- SRS: Leitner IV=[10min,1d,3d,7d,16d,35d,90d]; box=consecutive-right (capped); "mit Mühe" keeps box (min 1), miss→box 0 +10min requeue. Mistake-budget prop (int, default 30, 5-80 step 5): no new words after N misses/day. BATCH=10 queue refill.
- Card record: {box,due,lapsed,reps,hits,slow,misses,q(0/1/2),t,zuletzt,stufe}. Stats: {day,reviewed,newToday,wrongToday,slowToday,streak,lastDay}. sessions[]: {ts,date,reviewed,sofort,muehe,falsch,neu,woerter[]}.
- Persistence: localStorage KEY + IndexedDB mirror + "Master-Brain" project file (fetch Lernprotokoll.json) merged by newer t per card; export/import JSON buttons; never overwrite non-empty with empty; navigator.storage.persist().
- Views: home (due count, mistakes today, known count + CEFR A1-C2 bars at 500/1k/2k/4k/8k/16k, word list rows, master-brain panel), study (card, reveal, 3 grade buttons w/ next-interval labels, progress bar), done (Μπράβο! summary).
- Home stat labels German; keys idOf = German word.

Design system: Organic (default DS, /projects/450b95c5-4b1c-4050-ad88-879bb023b5a0). Cream #f5ead8 bg, text #201e1d, terracotta accent #c67139, sage accent-2 #7a8a5e, 100-900 ramps, Caprasimo headings / Figtree body, radius-lg 16px + pill 999px buttons, Lucide icons stroke 2.75, .washed wrapper for photos (desaturated/lifted), shadows tuned, left-aligned asymmetric, warm & playful. Copy styles.css from DS project; component classes: btn(-primary/-secondary/-ghost/-block), tag(-accent/-accent-2/-neutral/-outline), card, input, seg, dialog, table, nav.

Higgsfield painting job: 83d6af7c-a25b-43e2-a095-8e457ab6f06e (nano_banana_2, 3:4, French-beat-Greeks neoclassical spoof). Poll with higgsfield jobs_wait (search tool), then download result URL into project (assets/bataille.jpg).

User asks: French version, optimized UI/UX, splash with painting + "launch superior vocabulary" button → trainer; low-token memory file (CSV) tracking word/ease/last-learned + metadata for gamification; runs natively here; phone-app export later.
