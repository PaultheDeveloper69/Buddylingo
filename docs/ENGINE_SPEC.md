# Learning Engine v2 — Specification

Distilled from the research paper (see project uploads) and user decisions of 2026-08-15/16.

## Principles
1. Vocabulary volume first. Word-knowledge breadth beats everything else; games and grammar come after words are known.
2. Retrieval strengthens memory; isolation is fine for encoding. Flashcard-style retrieval is the core loop.
3. Spacing is adaptive, not a fixed ladder.

## Scheduler (FSRS-style)
Per word, per channel state: difficulty D, stability S, retrievability R (computed from elapsed time and S).
- Review outcome grades: again / hard / good / easy (prototype maps correct/incorrect onto good/again).
- Next interval chosen so predicted R at review time ≈ target retention 0.9 (tunable 0.8–0.95).
- New words introduced in semantically spaced batches (avoid same-category clumps within a session batch).
- Backlog recovery: when due-count exceeds a daily budget, spread overdue reviews over coming days by descending retrievability loss, never as one scary pile.
- Immutable review-event log is the source of truth; card state is derivable/rebuildable from it.

## Channels (staged, per word)
1. recognition — target→source, tap/flip (exists in prototype)
2. production — source→target, typed; accent-tolerant, synonym-tolerant checking
3. gender — article drill (FR: un/une/le/la; EL: ο/η/το) for nouns only
4. context — cloze sentences / collocations (top verbs first)
A word unlocks the next channel when stable in the previous one (S above threshold). Dashboard reports receptive vs active counts separately.

## Answer checking (production)
- Normalize: trim, lowercase, NFC.
- Accent-tolerant: accent errors flagged as "almost" (half credit, shown correction), not failure.
- Synonym sets: exact synonyms accepted; register mismatches accepted with a note.
- Morphology: wrong article/gender = specific feedback, scored separately from the word itself.
- EL specifics: final sigma (ς/σ) normalization, tonos-tolerant, Greek keyboard input.

## Data model
- vocabulary item: id, language, source, target, pron, category (N/V/A/B/P...), gender (derivable from article in target string), tier, synonyms[], collocations[]
- review event: user_id, word_id, channel, grade, elapsed_ms, ts (append-only)
- word state: user_id, word_id, channel, D, S, last_review, due (cache; rebuildable)

## Explicitly deferred
- Audio/listening channel (no audio source yet)
- Conjugation/tense training beyond the existing reference tables
