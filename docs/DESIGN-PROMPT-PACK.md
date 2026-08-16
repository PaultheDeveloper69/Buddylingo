# BuddyLingo — Design Handover & Image-Generation Prompt Pack

Use this document with any image generator (ChatGPT/DALL-E, Midjourney, etc.)
to create imagery that fits the app. Copy blocks verbatim, then swap the
[SUBJECT] line.

---

## 1. Design philosophy (paste as context)

BuddyLingo is a vocabulary-battle app where languages are factions and foods
are their fighters. The look is a hand-drawn ink sketchbook: serious grumpy
determination played completely straight on ridiculous food characters.
Warm paper backgrounds, black ink linework, ONE flat accent color per
language. Never glossy, never 3D, never corporate, no gradients, no emoji
style, no text inside images. Humor comes from attitude, not exaggeration.

## 2. Color codes

- Paper background: #f6f4ef (all art must sit on pure white #ffffff so it
  blends onto paper via multiply)
- Ink: near-black sketch lines
- French red: #d62828 (light tint #fbe9e7) — beret
- Greek blue: #2160a8 (tint #d2dfee) — navy leaf / laurel
- German gold: #946f00 (tint #eadfc0) — alpine hat with gold feather
- Spanish orange: #c2571d (tint #f1dccb) — montera / neckerchief
- Tunisian green: #2a8c46 (tint #d4e9da) — UI only; hats are RED chechias
- Gold accent (medals, XP): #b08d3f / #f2c94c
- Text dark: #17181d · muted: #8a857a

## 3. Master character prompt (the house style)

> Hand-drawn ink cartoon food mascot: bold-to-thin sketchy black ink
> outlines with crosshatch shading, white paper-toned body (no color fill
> on the body), grumpy determined cartoon eyes with heavy brows, tiny thin
> stick legs with small black feet, small stick arms, standing centered on
> a pure white background, flat 2D illustration, single small colored
> accent only, no text, no frame, no shadow box.
> Subject: [SUBJECT]

### Existing cast (for reference / consistency)
- FR: croissant + red beret (hero), baguette, wedge of fromage, brie — red berets
- EL: lemon, feta cube, tzatziki bowl, dolma roll — small navy leaves
- DE: pretzel + black alpine hat with gold feather (hero), sausage w/ gold
  bow tie, potato w/ gold flat cap
- ES: paella pan (hero), churro w/ orange montera, jamón leg
- TN: harissa tin + RED chechia with black tassel (hero), couscous bowl,
  brik triangle — all red chechias

### New-character [SUBJECT] examples
- "a wheel of camembert wearing a small red beret" (FR)
- "an olive wearing a tiny navy laurel wreath" (EL)
- "a jar of mustard with a small black alpine hat, gold feather" (DE)
- "a slice of tortilla española with a small orange neckerchief" (ES)
- "a mint tea glass wearing a small red chechia with black tassel" (TN)

## 4. Animation prompt (image-to-video, 5s loop)

> Subtle looping idle animation of the hand-drawn ink cartoon [SUBJECT].
> CRITICAL FRAMING: the ENTIRE character stays fully visible at all times —
> feet, legs and ground shadow included, generous white margin on all
> sides, never crop any part. Background solid pure white #FFFFFF.
> Motion: gentle side-to-side sway, grumpy eye blinks, [ACCESSORY] moves
> slightly. Camera completely static, character centered, flat 2D
> hand-drawn ink sketch style preserved exactly, seamless loop, no audio.

## 5. Iconography prompt (UI icons, badges, medals)

> Minimal hand-drawn ink icon in a sketchbook style: single-weight black
> ink linework with light crosshatch, one flat accent color [HEX],
> centered on pure white, flat 2D, no text, no frame, 1:1.
> Subject: [e.g. "a laurel military medal", "a tiny fortress tower",
> "crossed baguette and olive branch like crossed swords"]

## 6. Scene / battle illustration prompt

> Hand-drawn ink cartoon battle scene on pure white: a mob of French food
> characters (croissant, baguette, cheese wedges in red berets) facing off
> against Greek food characters (lemon, feta cube, tzatziki bowl with navy
> leaves), fists raised, grumpy determined faces, playful not violent,
> sketchy black ink with crosshatch, only red and blue accents, flat 2D,
> no text.

## 7. Hard rules (append to any prompt if results drift)

- NOT 3D, NOT glossy, NOT photorealistic, NOT clip-art, no gradients
- body stays white paper tone — accent color only on the hat/accessory
- pure white background edge to edge (the app blends it away)
- one character per image unless a scene is requested
- keep line weight THIN and sketchy (match a light pen, not a marker)
- no text, no watermark, no border, no drop-shadow box

## 8. Typography (for any graphics with text — add text yourself later)
- Display: Gloock (serif) · UI: Figtree (sans) · dark #17181d on #f6f4ef
