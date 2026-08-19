// BuddyLingo — THE COURT + WORDS OF AFFIRMATION scenario engine.
//
// Replaces the answer-first decks. A scenario is no longer "situation + model line";
// it is a small sequence of DECISIONS the player has to make before any model answer
// exists. The spaced-repetition engine is unchanged: one scenario is still one card,
// and the card's box now selects the DEPTH of the round instead of the reading mode.
//
//   depth 1  (box 0-1)  full scaffolding — read the situation, spot the hook, dodge the NPC
//   depth 2  (box 2-3)  pick the angle, then build the line from parts
//   depth 3  (box 4+)   no scaffolding — angle and build only, harder distractors
//
// Step shape:
//   k    step kind — swipe | hook | npc | angle | heat | notice | name | impact | pick | potato | target | build
//   lvl  which depths the step appears at, e.g. "12"
//   q    the prompt
//   o    options: { t text, d sub-label, ok 1 = right / 2 = also defensible / 0 = wrong,
//                   v verdict key, w Buddy's line }
//   For k:"build" — sl: slots [{ label, o:[{t, ok}] }]
//
// Nothing here is a script to memorise. The build fragments are deliberately
// recombinable: the lesson is the grammar (observation · twist · thread), not the sentence.

(function () {
  // ── Buddy's verdict vocabulary ──────────────────────────────────────────────
  var V = {
    npc: ["NPC", "The previous eighteen men said this too."],
    npc2: ["NPC", "Technically conversation. Emotionally wallpaper."],
    dead: ["DEAD END", "Lovely statement. She now has absolutely nowhere to go."],
    interview: ["INTERVIEW MODE", "Question four. She's beginning to suspect this is customs."],
    tryhard: ["TRY-HARD", "You can hear you typing this with one eyebrow raised."],
    sauce: ["TOO MUCH SAUCE", "She flirted. You proposed marriage."],
    creep: ["ABSOLUTELY NOT", "No."],
    fine: ["FINE", "Nothing wrong with it. Nothing particularly alive either."],
    near: ["GOOD ANGLE. BAD LANDING.", "You saw it. You stepped on it."],
    closed: ["GOOD, BUT CLOSED", "Nice line. Gives her nothing to return."],
    also: ["ALSO WORKS. DIFFERENT ENERGY.", "Not what I'd have done. Hard to argue with."],
    sharp: ["THERE IT IS", "Specific, and only about her."],
    thread: ["THREAD FOUND", "She can answer that in one breath."],
    spicy: ["GOOD SAUCE", "Bold, and calibrated. Rare combination."],
    saw: ["YOU SAW IT", "Everyone else was looking at the dress."],
    pulse: ["FINALLY. A PULSE.", "Weird. Weird is fine."],
    callback: ["CALLBACK", "You remembered something. Miracles happen."],
    restraint: ["CORRECT: NOTHING", "Doing nothing is a move. Your favourite new one."],
    cold: ["TOO COLD", "You sounded like her landlord."],
    // WA
    potato: ["POTATO", "You have successfully communicated that the event was nice."],
    linkedin: ["LINKEDIN", "Congratulations on her personal growth journey."],
    target: ["WRONG TARGET", "She got promoted. You complimented her hair."],
    hallmark: ["HALLMARK", "Nobody has spoken like this outside a greeting card."],
    much: ["TOO MUCH", "She made you tea. She did not donate a kidney."],
    beautiful: ["BEAUTIFUL", "Specific. True. She'll know exactly what you mean."],
    seen: ["SHE'LL FEEL SEEN", "You named the part she thought nobody clocked."]
  };

  // ── Simulated replies. Skill and social outcome are separate systems. ───────
  // Pools are generic on purpose: the same good line lands differently on different days.
  var RP = {
    laugh: [["Ok that got an actual laugh out of me on the tram.", 1], ["I wasn't ready for that. Well done.", 1], ["Right, you're funny. Annoying.", 1]],
    build: [["Correct, and he's fully aware of it. He signs the rent cheques.", 2], ["Careful, I will absolutely escalate this.", 2], ["Ok but you've now committed to a bit, so continue.", 2]],
    warm: [["That's a much better question than I usually get.", 1], ["Ok you've earned a proper answer, hang on.", 1], ["Nobody's asked me that. Give me a second.", 1]],
    poke: [["Big words from someone with two photos and a group shot.", 1], ["Strong opening. Let's see if you can keep it up.", 1]],
    polite: [["Haha yeah! It was fun 😊", 0], ["Thanks! Yeah I do a bit of that.", 0], ["It's in Portugal 🙂", 0]],
    flat: [["haha", 0], ["yeah", 0], ["lol", 0]],
    none: [["", -1]],
    tangent: [["Random but do you know anywhere that fixes bike brakes", 0], ["Sorry, chaos day. What were we talking about", 0]]
  };

  // ── Mastery concepts. These are the actual vocabulary of the two modes. ─────
  var CONCEPTS = {
    ll: {
      notice: "Noticing", specificity: "Specificity", angle: "Finding the angle", twist: "The twist",
      thread: "Threading", playfulness: "Playfulness", calibration: "Calibration",
      reciprocity: "Reciprocity", restraint: "Knowing when to stop", callback: "Callbacks"
    },
    wa: {
      notice: "Noticing", effort: "Effort", consistency: "Consistency", courage: "Courage",
      thoughtfulness: "Thoughtfulness", competence: "Competence", specificity: "Specificity",
      impact: "Naming impact", restraint: "Saying less", care: "Care"
    }
  };

  function s(id, o) { o.id = id; return o; }

  // ═══════════════════════════════════════════════════════════════════════════
  // LOVER LANGUAGE — THE COURT
  // ═══════════════════════════════════════════════════════════════════════════
  var LL = [
    s("ll_dog", {
      cat: "N", tier: 0, concept: "specificity", pack: "DOG PERSON", worth: 1,
      sit: "Her profile is mostly the dog. She's in the background of her own photos.",
      card: { photo: "Golden retriever in the passenger seat wearing her sunglasses. She is somewhere behind it.", prompt: "My simple pleasures", line: "A dog who ignores me and a coffee that doesn't." },
      steps: [
        { k: "hook", lvl: "12", q: "Three men have already sent “cute dog”. What are they missing?", o: [
          { t: "The dog is very cute", ok: 0, v: "npc", w: "Everyone starts here. Most men stay here." },
          { t: "The dog is clearly running the household", ok: 1, v: "saw", w: "That's the joke she wrote and nobody picked up." },
          { t: "She looks good in that photo", ok: 0, v: "npc2", w: "You've reviewed her appearance. Congratulations." },
          { t: "She probably likes animals", ok: 0, v: "dead", w: "Astonishing detective work." }
        ] },
        { k: "npc", lvl: "12", q: "Which one has she read eleven times today?", o: [
          { t: "Cute dog! What's his name?", ok: 1, v: "npc", w: "Correct. That's the wallpaper." },
          { t: "That dog wrote this profile and I don't think you know you're on it.", ok: 0, v: "sharp", w: "No. That one's alive." },
          { t: "Who ignores you more, him or the coffee?", ok: 0, v: "thread", w: "No — that one uses her own line back at her." }
        ] },
        { k: "angle", lvl: "123", q: "Your move. Which way in?", o: [
          { t: "ASK", d: "What's his name, what breed", ok: 0, v: "npc", w: "You've chosen the queue." },
          { t: "MOCK-SERIOUS ACCUSATION", d: "The dog is the one with the profile", ok: 1, v: "sharp", w: "Yes. Commit to it." },
          { t: "COMPLIMENT", d: "Tell her the dog is beautiful", ok: 0, v: "fine", w: "You complimented the dog. He can't reply." },
          { t: "ROLE REVERSAL", d: "Apply to the dog for permission", ok: 2, v: "also", w: "Different flavour, same instinct. Fine." }
        ] },
        { k: "build", lvl: "23", q: "Build it. Observation, twist, then a way back to her.", sl: [
          { label: "OBSERVATION", o: [{ t: "That dog is in four of these photos and you're in two", ok: 1 }, { t: "Your dog is so cute", ok: 0 }, { t: "Nice photos", ok: 0 }] },
          { label: "TWIST", o: [{ t: "which suggests he made the profile", ok: 1 }, { t: "and I love dogs too", ok: 0 }, { t: "you must love him a lot", ok: 0 }] },
          { label: "THREAD", o: [{ t: "so what has he told you about me?", ok: 1 }, { t: "anyway how's your week?", ok: 0 }, { t: "he's lucky.", ok: 0 }] }
        ] }
      ],
      reveal: { line: "That dog is in four of these photos and you're in two, which suggests he made the profile. So what has he told you about me?", why: "One real observation, one absurd conclusion, one question only she can answer. That's the whole grammar." }
    }),

    s("ll_fish", {
      cat: "N", tier: 0, concept: "notice", pack: "HINGE CLASSICS", worth: 1,
      sit: "Elegant dress. Enormous fish. No explanation offered.",
      card: { photo: "Full-length green silk dress, heels sinking into a jetty, holding a pike roughly the size of a toddler.", prompt: "Two truths and a lie", line: "I've been on TV, I can't swim, I once caught dinner in a cocktail dress." },
      steps: [
        { k: "hook", lvl: "123", q: "There is exactly one interesting thing in this photo.", o: [
          { t: "The dress", ok: 0, v: "fine", w: "So did the last four men." },
          { t: "She's attractive", ok: 0, v: "npc", w: "Riveting." },
          { t: "The contrast — that outfit, that fish", ok: 1, v: "saw", w: "The absurdity IS the hook. It always is." },
          { t: "Where the photo was taken", ok: 0, v: "npc2", w: "Geography. Her favourite subject." }
        ] },
        { k: "npc", lvl: "12", q: "Kill the NPC line.", o: [
          { t: "Wow, where was this?", ok: 1, v: "npc", w: "Yes. Bin it." },
          { t: "Nobody dresses like that by accident and nobody catches that by accident. Which came first?", ok: 0, v: "sharp", w: "That one's fine, leave it alone." },
          { t: "I need the full story and I need it in order.", ok: 0, v: "thread", w: "That works. Not the NPC." }
        ] },
        { k: "angle", lvl: "123", q: "Pick the approach.", o: [
          { t: "TINY FICTION", d: "Narrate what happened next", ok: 1, v: "sharp", w: "Invent the eight seconds after the shutter. She'll correct you, which is a reply." },
          { t: "ASK", d: "Where, when, what fish", ok: 0, v: "interview", w: "You've opened with paperwork." },
          { t: "COMPLIMENT", d: "She looks amazing", ok: 0, v: "npc", w: "You have a photo of a woman holding a pike and you chose to talk about the dress." },
          { t: "BENIGN CHALLENGE", d: "Question the lie in her three", ok: 2, v: "also", w: "Also good. You used the prompt instead of ignoring it." }
        ] },
        { k: "build", lvl: "23", sl: [
          { label: "OBSERVATION", o: [{ t: "The dress says wedding, the fish says survival show", ok: 1 }, { t: "That's a big fish!", ok: 0 }, { t: "You look great here", ok: 0 }] },
          { label: "TWIST", o: [{ t: "and neither of us is going to acknowledge the heels", ok: 1 }, { t: "I love fishing as well", ok: 0 }, { t: "you must be very outdoorsy", ok: 0 }] },
          { label: "THREAD", o: [{ t: "So: whose idea was this?", ok: 1 }, { t: "Anyway, how's your Sunday?", ok: 0 }, { t: "Impressive stuff.", ok: 0 }] }
        ] }
      ],
      reveal: { line: "The dress says wedding, the fish says survival show, and neither of us is going to acknowledge the heels. So: whose idea was this?", why: "You noticed the contrast, you made it funnier, and you left one small question she can answer instantly." }
    }),

    s("ll_hey", {
      cat: "N", tier: 0, concept: "specificity", pack: "HINGE CLASSICS", worth: 1,
      sit: "You matched. Your thumbs have gone blank.",
      card: { photo: "Three photos: a rooftop, a very old cat, a half-finished tattoo.", prompt: "The way to win me over", line: "Have an opinion about something. Anything." },
      steps: [
        { k: "npc", lvl: "123", q: "She has asked for an opinion. Which of these is the NPC move?", o: [
          { t: "Hey, how's it going?", ok: 1, v: "npc", w: "You knew. You've sent it anyway, historically." },
          { t: "Opinion: that cat has seen things and is not going to talk about them.", ok: 0, v: "pulse", w: "That's an opinion. Weird. Good." },
          { t: "Strong prompt. Mine: tattoos should be finished within the same decade.", ok: 0, v: "spicy", w: "Cheeky, specific, uses her own photo. Leave it." }
        ] },
        { k: "hook", lvl: "12", q: "What did she actually ask for?", o: [
          { t: "A conversation starter", ok: 0, v: "fine", w: "Close. Vague." },
          { t: "A position. Any position, held out loud.", ok: 1, v: "saw", w: "Right. So take one, about something in her photos." },
          { t: "A compliment", ok: 0, v: "npc", w: "She specifically did not ask for that." },
          { t: "Someone confident", ok: 0, v: "fine", w: "True and useless. Confidence isn't a sentence." }
        ] },
        { k: "build", lvl: "23", q: "An opinion, about something of hers.", sl: [
          { label: "OBSERVATION", o: [{ t: "Opinion, since you asked:", ok: 1 }, { t: "Hey!", ok: 0 }, { t: "You seem cool,", ok: 0 }] },
          { label: "TWIST", o: [{ t: "an unfinished tattoo is the most trustworthy thing on a profile", ok: 1 }, { t: "you're really pretty", ok: 0 }, { t: "I like your photos", ok: 0 }] },
          { label: "THREAD", o: [{ t: "How long has it been sitting like that?", ok: 1 }, { t: "How's your week going?", ok: 0 }, { t: "Anyway 😄", ok: 0 }] }
        ] }
      ],
      reveal: { line: "Opinion, since you asked: an unfinished tattoo is the most trustworthy thing on a profile. How long has it been sitting like that?", why: "She asked for an opinion and got one, aimed at something only she has." }
    }),

    s("ll_pasta", {
      cat: "N", tier: 1, concept: "playfulness", pack: "FOODIE", worth: 1,
      sit: "“I make incredible pasta.” Written down. In public.",
      card: { photo: "Kitchen counter, flour everywhere, a rolling pin, and one extremely confident bowl of tagliatelle.", prompt: "I go crazy for", line: "Pasta I made myself. I'm not humble about it." },
      steps: [
        { k: "hook", lvl: "12", q: "What has she handed you?", o: [
          { t: "A shared interest in food", ok: 0, v: "npc", w: "You're about to say “I love cooking too”. I can feel it." },
          { t: "A claim. On the record. Unverified.", ok: 1, v: "saw", w: "Exactly. She's given you something to press on." },
          { t: "A hobby to ask about", ok: 0, v: "interview", w: "Question one of four, is it." },
          { t: "Evidence she's wife material", ok: 0, v: "creep", w: "Put that away." }
        ] },
        { k: "angle", lvl: "123", q: "Which move?", o: [
          { t: "PLAYFUL MISINTERPRETATION", d: "Treat the claim as a legal statement", ok: 1, v: "sharp", w: "Yes. Take her seriously in the wrong register." },
          { t: "ASK", d: "What kind of pasta do you make?", ok: 0, v: "npc", w: "Line one of the queue." },
          { t: "BENIGN CHALLENGE", d: "Make her name the dish she'd stake it on", ok: 2, v: "also", w: "Also works. Slightly more direct energy." },
          { t: "COMPLIMENT", d: "Tell her that's impressive", ok: 0, v: "fine", w: "Warm. Closed. Next." }
        ] },
        { k: "build", lvl: "23", sl: [
          { label: "OBSERVATION", o: [{ t: "“Incredible” is a serious allegation to put in writing", ok: 1 }, { t: "That pasta looks amazing", ok: 0 }, { t: "I love pasta too", ok: 0 }] },
          { label: "TWIST", o: [{ t: "and I'm afraid I'm going to need it tested", ok: 1 }, { t: "you must be a great cook", ok: 0 }, { t: "I'm quite good at cooking as well", ok: 0 }] },
          { label: "THREAD", o: [{ t: "Name the dish you'd stake your reputation on.", ok: 1 }, { t: "Do you cook a lot?", ok: 0 }, { t: "We should cook together sometime 😉", ok: 0 }] }
        ] }
      ],
      reveal: { line: "“Incredible” is a serious allegation to put in writing, and I'm afraid I'm going to need it tested. Name the dish you'd stake your reputation on.", why: "Mock-serious, and it ends with a question she'll enjoy answering. She gets to boast; you gave her permission." }
    }),

    s("ll_board", {
      cat: "V", tier: 1, concept: "angle", pack: "HINGE CLASSICS", worth: 1,
      sit: "“I'm weirdly competitive about board games.”",
      card: { photo: "Blurry photo of a Carcassonne board mid-argument. Two hands in frame, neither friendly.", prompt: "Dating me is like", line: "Fun until the board games come out." },
      steps: [
        { k: "angle", lvl: "123", q: "Four ways in. Pick one.", o: [
          { t: "ASK", d: "Which games?", ok: 0, v: "npc", w: "You've turned a threat into a survey." },
          { t: "ROLE REVERSAL", d: "Treat it as an official warning received", ok: 1, v: "sharp", w: "Yes. She wrote a warning; process it like one." },
          { t: "COMPLIMENT", d: "Competitiveness is attractive", ok: 0, v: "tryhard", w: "You can hear the eyebrow." },
          { t: "ABSURD ESCALATION", d: "Out-claim her", ok: 2, v: "also", w: "Also alive. Riskier, funnier if she bites." }
        ] },
        { k: "npc", lvl: "12", q: "Which reply dies in her inbox?", o: [
          { t: "Haha me too, what do you play?", ok: 1, v: "npc", w: "Two dead moves for the price of one." },
          { t: "Noted. So what exactly am I training for?", ok: 0, v: "thread", w: "That one's the good one." },
          { t: "I'll be honest, I've never lost at Carcassonne and I don't intend to start.", ok: 0, v: "spicy", w: "Bold. Also a thread." }
        ] },
        { k: "build", lvl: "23", sl: [
          { label: "OBSERVATION", o: [{ t: "You've issued a competitive warning", ok: 1 }, { t: "I love board games", ok: 0 }, { t: "That's so funny", ok: 0 }] },
          { label: "TWIST", o: [{ t: "before we've even met", ok: 1 }, { t: "I'm competitive too", ok: 0 }, { t: "which is cute", ok: 0 }] },
          { label: "THREAD", o: [{ t: "so what exactly am I training for?", ok: 1 }, { t: "what games do you like?", ok: 0 }, { t: "we'll see about that.", ok: 0 }] }
        ] }
      ],
      reveal: { line: "You've issued a competitive warning before we've even met. So what exactly am I training for?", why: "Role reversal: you took her joke seriously and handed the next move straight back." }
    }),

    s("ll_ski", {
      cat: "N", tier: 1, concept: "twist", pack: "HINGE CLASSICS", worth: 1,
      sit: "Ski photo. Mid-slope. Poles at an angle no instructor would sign off on.",
      card: { photo: "Bluebird day, red jacket, one ski visibly further ahead than the other.", prompt: "My irrational fear", line: "Chairlifts. Which is inconvenient." },
      steps: [
        { k: "hook", lvl: "12", q: "There's a joke sitting in the two things she's given you.", o: [
          { t: "She skis a lot", ok: 0, v: "dead", w: "Yes. That's the photo. Well done." },
          { t: "She's afraid of chairlifts but keeps going up them anyway", ok: 1, v: "saw", w: "The contradiction is the material. Always is." },
          { t: "The view is beautiful", ok: 0, v: "npc", w: "You'd like to compliment a mountain." },
          { t: "She's sporty", ok: 0, v: "npc2", w: "Wallpaper." }
        ] },
        { k: "angle", lvl: "123", q: "Move?", o: [
          { t: "TINY FICTION", d: "Date the photo eight seconds before an incident", ok: 1, v: "sharp", w: "Small invented world. She'll want to defend herself." },
          { t: "ASK", d: "Where do you usually ski?", ok: 0, v: "npc", w: "Congratulations, it's a form." },
          { t: "DELIBERATE OVER-SPECIFICITY", d: "Diagnose exactly how afraid she is", ok: 2, v: "also", w: "Also works, and it's a proper thread." },
          { t: "COMPLIMENT", d: "She looks great in ski gear", ok: 0, v: "npc", w: "No." }
        ] },
        { k: "build", lvl: "23", sl: [
          { label: "OBSERVATION", o: [{ t: "This was taken about eight seconds before something expensive happened", ok: 1 }, { t: "Great ski photo!", ok: 0 }, { t: "You look like a pro", ok: 0 }] },
          { label: "TWIST", o: [{ t: "and you got up there on a chairlift you're apparently terrified of", ok: 1 }, { t: "I love skiing too", ok: 0 }, { t: "must have been a fun trip", ok: 0 }] },
          { label: "THREAD", o: [{ t: "Which part did you scream at?", ok: 1 }, { t: "Where was it?", ok: 0 }, { t: "Looks amazing.", ok: 0 }] }
        ] }
      ],
      reveal: { line: "This was taken about eight seconds before something expensive happened — and you got up there on a chairlift you're apparently terrified of. Which part did you scream at?", why: "You used both things she gave you and turned them into one small story she can join." }
    }),

    s("ll_coffee", {
      cat: "V", tier: 1, concept: "specificity", pack: "HINGE CLASSICS", worth: 1,
      sit: "“I go crazy for good coffee.” Nothing else to work with.",
      card: { photo: "Latte art, from above, in a café with exposed brick and no menu.", prompt: "My simple pleasures", line: "Good coffee. I'm insufferable about it." },
      steps: [
        { k: "npc", lvl: "12", q: "One of these is what everybody sends.", o: [
          { t: "Ooh what's your coffee order?", ok: 1, v: "npc", w: "Yes. Barista small talk." },
          { t: "How unbearable are you about coffee — supermarket cappuccino, or you own a tiny set of scales?", ok: 0, v: "sharp", w: "That's the good one. Two options, both funny, both easy." },
          { t: "She said insufferable, so ask her to prove it.", ok: 0, v: "spicy", w: "Also alive." }
        ] },
        { k: "angle", lvl: "123", q: "Approach.", o: [
          { t: "DELIBERATE OVER-SPECIFICITY", d: "Offer her two extremely precise options", ok: 1, v: "sharp", w: "Specificity is the whole trick. Make the choice absurd and easy." },
          { t: "ASK", d: "What's your favourite café?", ok: 0, v: "npc", w: "Google could have asked that." },
          { t: "COMPLIMENT", d: "Great taste", ok: 0, v: "dead", w: "Praise with no door in it." },
          { t: "SELF-DEPRECATION", d: "Admit you drink instant", ok: 2, v: "also", w: "Honest, funny, gives her a reason to be appalled. Works." }
        ] },
        { k: "build", lvl: "23", sl: [
          { label: "OBSERVATION", o: [{ t: "You said insufferable, so I need to know the exact level", ok: 1 }, { t: "I love coffee too", ok: 0 }, { t: "That looks like great coffee", ok: 0 }] },
          { label: "TWIST", o: [{ t: "supermarket cappuccino, or do you own a tiny set of scales", ok: 1 }, { t: "what's your order?", ok: 0 }, { t: "I'm a big coffee guy", ok: 0 }] },
          { label: "THREAD", o: [{ t: "Be honest. I'll adjust my behaviour accordingly.", ok: 1 }, { t: "Anyway, how's your day?", ok: 0 }, { t: "😄", ok: 0 }] }
        ] }
      ],
      reveal: { line: "You said insufferable, so I need to know the exact level: supermarket cappuccino, or do you own a tiny set of scales? Be honest, I'll adjust my behaviour accordingly.", why: "Two absurdly specific options and a straight face. Nobody can resist choosing." }
    }),

    s("ll_travel", {
      cat: "V", tier: 2, concept: "thread", pack: "TRAVEL PROFILE", worth: 1,
      sit: "Five countries, four cocktails, one landmark, zero context.",
      card: { photo: "Rooftop somewhere warm, Aperol at golden hour, a cathedral doing the work in the background.", prompt: "Best travel story", line: "Too long for here. Ask me." },
      steps: [
        { k: "hook", lvl: "12", q: "She has literally invited something. What?", o: [
          { t: "A question about travel", ok: 0, v: "npc", w: "Broad. She'll answer it like a customs officer." },
          { t: "The story. She's told you it's long and asked you to ask.", ok: 1, v: "saw", w: "So ask for it properly, not politely." },
          { t: "A compliment about the photo", ok: 0, v: "npc2", w: "No." },
          { t: "Recommendations", ok: 0, v: "fine", w: "You've made yourself a travel agent." }
        ] },
        { k: "npc", lvl: "123", q: "Which one is wallpaper?", o: [
          { t: "Wow, where was this?", ok: 1, v: "npc", w: "The most-sent message in Europe." },
          { t: "This looks like either the best holiday of your life or the beginning of a very expensive mistake.", ok: 0, v: "sharp", w: "Leave it. That's the line." },
          { t: "You've teased a long story and then left. I'd like the unabridged version.", ok: 0, v: "thread", w: "That works too." }
        ] },
        { k: "build", lvl: "23", sl: [
          { label: "OBSERVATION", o: [{ t: "This looks like either the best holiday of your life", ok: 1 }, { t: "Amazing photo!", ok: 0 }, { t: "I love travelling too", ok: 0 }] },
          { label: "TWIST", o: [{ t: "or the beginning of a very expensive mistake", ok: 1 }, { t: "you're so lucky", ok: 0 }, { t: "I've been there as well", ok: 0 }] },
          { label: "THREAD", o: [{ t: "You said to ask, so: which one was it?", ok: 1 }, { t: "Where was it?", ok: 0 }, { t: "Looks great.", ok: 0 }] }
        ] }
      ],
      reveal: { line: "This looks like either the best holiday of your life or the beginning of a very expensive mistake. You said to ask, so: which one was it?", why: "You took the invitation she actually wrote, and you gave her two funny doors instead of one open field." }
    }),

    s("ll_gym", {
      cat: "A", tier: 2, concept: "calibration", pack: "GYM ERA", worth: 1,
      sit: "She's mentioned she's been lifting three times a week since January.",
      card: { photo: "Gym mirror selfie, phone deliberately covering half her face, chalk on the bar.", prompt: "A life goal of mine", line: "Deadlift my own bodyweight. Close." },
      steps: [
        { k: "heat", lvl: "123", q: "Same interaction, three temperatures. Which lands?", o: [
          { t: "Nice, keep it up 💪", ok: 0, v: "cold", w: "You sounded like a fitness app notification." },
          { t: "January to now without stopping is the part almost nobody manages. How close is close?", ok: 1, v: "sharp", w: "Warm, specific, and it asks. Correct temperature." },
          { t: "You must look unreal by now", ok: 0, v: "sauce", w: "She told you about discipline. You reviewed her body." },
          { t: "Respect. What's the actual number you're chasing?", ok: 2, v: "also", w: "Cooler, still good. Different energy." }
        ] },
        { k: "hook", lvl: "12", q: "What's worth naming here?", o: [
          { t: "Her results", ok: 0, v: "target", w: "You can't see her results. You can see her calendar." },
          { t: "That she kept going for eight months", ok: 1, v: "saw", w: "Consistency. The invisible bit. Name that." },
          { t: "Her dedication to fitness generally", ok: 0, v: "linkedin", w: "You've written her a performance review." },
          { t: "That she looks good", ok: 0, v: "npc", w: "No." }
        ] }
      ],
      reveal: { line: "January to now without stopping is the part almost nobody manages. How close is close?", why: "Praise the streak, not the body, and finish with a question. She'll tell you the number and mean it." }
    }),

    s("ll_one_word", {
      cat: "B", tier: 2, concept: "restraint", pack: "DRY TEXTER", worth: 1,
      sit: "BOSS FIGHT — THE ONE-WORD REPLIER. Your last three messages got “haha”, “yeah”, “lol”.",
      card: { photo: "Chat thread: three long messages from you, three short ones from her.", prompt: "Current status", line: "haha" },
      steps: [
        { k: "hook", lvl: "12", q: "What's actually happening?", o: [
          { t: "She's not interested", ok: 0, v: "fine", w: "Maybe. You don't know, and you're about to act like you do." },
          { t: "You're carrying the entire conversation and she's letting you", ok: 1, v: "saw", w: "Right. So stop carrying it." },
          { t: "You said something wrong", ok: 0, v: "fine", w: "That's anxiety talking, not evidence." },
          { t: "She's busy", ok: 0, v: "fine", w: "Also possible. Also not your problem to solve for her." }
        ] },
        { k: "angle", lvl: "123", q: "Your move. Careful.", o: [
          { t: "ASK ANOTHER QUESTION", d: "Keep it alive", ok: 0, v: "interview", w: "Question five. She's beginning to suspect this is customs." },
          { t: "ONE LAST SERVE, THEN STOP", d: "Something light and easy, then leave it", ok: 1, v: "sharp", w: "One serve. Then hands off the ball." },
          { t: "SAY YOU'VE NOTICED", d: "“You okay? Feels like I'm doing all the work”", ok: 0, v: "dead", w: "You've put your anxiety in her inbox and asked her to file it." },
          { t: "NOTHING AT ALL", d: "Put the phone down", ok: 2, v: "restraint", w: "Genuinely defensible. Boring to play, correct in life." }
        ] },
        { k: "build", lvl: "23", q: "One serve. Make it cheap for her to return.", sl: [
          { label: "OBSERVATION", o: [{ t: "Right, I'm going to try one thing", ok: 1 }, { t: "You've gone quiet on me", ok: 0 }, { t: "Sorry if I'm annoying you", ok: 0 }] },
          { label: "TWIST", o: [{ t: "and if it fails I'll accept the verdict with dignity", ok: 1 }, { t: "because I really like talking to you", ok: 0 }, { t: "I promise I'll shut up after", ok: 0 }] },
          { label: "THREAD", o: [{ t: "Best thing that's happened to you this week. Go.", ok: 1 }, { t: "How was your day?", ok: 0 }, { t: "Are you still there?", ok: 0 }] }
        ] }
      ],
      reveal: { line: "Right, I'm going to try one thing, and if it fails I'll accept the verdict with dignity. Best thing that's happened to you this week. Go.", why: "Light, no accusation, one easy question, and you've quietly told her you're not going to beg. If it dies, it dies." }
    }),

    s("ll_interview", {
      cat: "B", tier: 2, concept: "reciprocity", pack: "HINGE CLASSICS", worth: 1,
      sit: "BOSS FIGHT — THE INTERVIEW. You've asked four questions in a row. She's answering like a witness.",
      card: { photo: "Chat thread: four question marks in a column, three short answers.", prompt: "Her last message", line: "Berlin, yeah. About six years now." },
      steps: [
        { k: "hook", lvl: "12", q: "Why is this dying?", o: [
          { t: "She's boring", ok: 0, v: "npc", w: "You've asked her four census questions. Look inward." },
          { t: "You're extracting information instead of trading it", ok: 1, v: "saw", w: "Yes. Nothing of yours is in this conversation." },
          { t: "Wrong questions", ok: 0, v: "fine", w: "Partly. The bigger problem is the direction of travel." },
          { t: "Bad timing", ok: 0, v: "fine", w: "Convenient." }
        ] },
        { k: "angle", lvl: "123", q: "Escape route.", o: [
          { t: "ASK A BETTER QUESTION", d: "Something more interesting", ok: 0, v: "interview", w: "Still customs. Nicer uniform." },
          { t: "OFFER SOMETHING UNPROMPTED", d: "Give her a piece of you to react to", ok: 1, v: "sharp", w: "Trade, don't extract. Then she has something to hold." },
          { t: "SEND A MEME", d: "Change the medium", ok: 0, v: "dead", w: "You've filled the silence and given her nothing." },
          { t: "NAME IT AND LAUGH AT YOURSELF", d: "“I've been interviewing you”", ok: 2, v: "also", w: "Also works, if you actually follow it with something real." }
        ] },
        { k: "build", lvl: "23", sl: [
          { label: "OBSERVATION", o: [{ t: "I've asked you four questions in a row like a border official", ok: 1 }, { t: "So what else do you like doing?", ok: 0 }, { t: "Sorry, I talk too much", ok: 0 }] },
          { label: "TWIST", o: [{ t: "so here's something unasked: I moved here for a job I quit in five months", ok: 1 }, { t: "I've lived in Berlin for ages too", ok: 0 }, { t: "anyway, six years is a long time", ok: 0 }] },
          { label: "THREAD", o: [{ t: "Your turn to accuse me of something.", ok: 1 }, { t: "What do you do for work?", ok: 0 }, { t: "Nice one.", ok: 0 }] }
        ] }
      ],
      reveal: { line: "I've asked you four questions in a row like a border official, so here's something unasked: I moved here for a job I quit in five months. Your turn to accuse me of something.", why: "Reciprocity. You gave first, you made it slightly unflattering, and the handover is playful instead of another question." }
    }),

    s("ll_perfect", {
      cat: "A", tier: 3, concept: "calibration", pack: "HINGE CLASSICS", worth: 1,
      sit: "BOSS FIGHT — THE PERFECT PROFILE. Great photos, funny prompts, no obvious way in. Every instinct you have is to perform.",
      card: { photo: "Six photos, all good, none trying. A dog, a summit, a book, a birthday, a kitchen, a laugh.", prompt: "Change my mind about", line: "Camping. I've been told I'm wrong." },
      steps: [
        { k: "hook", lvl: "123", q: "The trap here is performance. So what do you do?", o: [
          { t: "Match her level — best line you've got", ok: 0, v: "tryhard", w: "She'll smell the effort through the screen." },
          { t: "Pick one small thing and talk like a person", ok: 1, v: "saw", w: "Yes. One angle. No audition." },
          { t: "Acknowledge the profile is good", ok: 0, v: "npc", w: "“Great profile!” You've become a reviewer." },
          { t: "Open with the strongest joke available", ok: 0, v: "tryhard", w: "Opening with your closer. Classic." }
        ] },
        { k: "angle", lvl: "123", q: "One angle. Choose.", o: [
          { t: "ABSURD ESCALATION", d: "Take the camping debate far too seriously", ok: 1, v: "sharp", w: "She asked to have her mind changed. Do the job with a straight face." },
          { t: "COMPLIMENT THE PROFILE", d: "Tell her it's the best one you've seen", ok: 0, v: "tryhard", w: "You've reviewed her, from below." },
          { t: "ASK ABOUT EVERYTHING", d: "Dog, summit, book, all of it", ok: 0, v: "interview", w: "Six questions. She'll answer two and leave." },
          { t: "STRAIGHT SINCERITY", d: "Say the honest thing simply", ok: 2, v: "also", w: "Also correct, and braver than it looks." }
        ] },
        { k: "build", lvl: "23", sl: [
          { label: "OBSERVATION", o: [{ t: "You've asked to have your mind changed about camping", ok: 1 }, { t: "Your profile is genuinely the best one I've seen", ok: 0 }, { t: "Hey, you seem great", ok: 0 }] },
          { label: "TWIST", o: [{ t: "so I'd like to formally argue that sleeping on rocks builds no character whatsoever", ok: 1 }, { t: "I love camping, it's the best", ok: 0 }, { t: "I'd love to take you camping", ok: 0 }] },
          { label: "THREAD", o: [{ t: "How many nights in before you admitted it?", ok: 1 }, { t: "Do you camp a lot?", ok: 0 }, { t: "Let me know 😄", ok: 0 }] }
        ] }
      ],
      reveal: { line: "You've asked to have your mind changed about camping, so I'd like to formally argue that sleeping on rocks builds no character whatsoever. How many nights in before you admitted it?", why: "You did the thing she asked, in one bit, without auditioning. That's what not performing looks like." }
    }),

    s("ll_double", {
      cat: "B", tier: 3, concept: "restraint", pack: "DRY TEXTER", worth: 1,
      sit: "BOSS FIGHT — DOUBLE TEXT PANIC. Six hours. No reply. The boss is your own anxiety.",
      card: { photo: "One sent message. Read at 14:02. It is now 20:11.", prompt: "Your thumbs", line: "..." },
      steps: [
        { k: "angle", lvl: "123", q: "Six hours. Choose.", o: [
          { t: "??", ok: 0, v: "dead", w: "Two characters of pure pressure." },
          { t: "“Guess you're busy 😂”", ok: 0, v: "tryhard", w: "Passive aggression with a laughing emoji hat on." },
          { t: "Nothing. Put the phone down.", ok: 1, v: "restraint", w: "Six hours is not a signal. It's an afternoon." },
          { t: "Send a meme to reopen it", ok: 0, v: "fine", w: "Better than “??”, still you managing your own nerves in her inbox." }
        ] },
        { k: "hook", lvl: "12", q: "What is six hours evidence of?", o: [
          { t: "She's lost interest", ok: 0, v: "fine", w: "Invented." },
          { t: "Nothing. It's six hours.", ok: 1, v: "saw", w: "Correct. Sit down." },
          { t: "You said something wrong", ok: 0, v: "fine", w: "Also invented." },
          { t: "You should have sent something better", ok: 0, v: "fine", w: "The line was fine. The waiting is the skill." }
        ] }
      ],
      reveal: { line: "[nothing sent]", why: "The move is no move. She replies tonight, or tomorrow, or not — and none of those outcomes are improved by a question mark." }
    }),

    s("ll_callback", {
      cat: "V", tier: 3, concept: "callback", pack: "HINGE CLASSICS", worth: 1,
      sit: "Two days ago she warned you she's competitive about board games. Now she's asking what you're up to.",
      card: { photo: "Chat thread, two days apart. The warning is still visible above.", prompt: "Her message", line: "What are you doing this weekend?" },
      steps: [
        { k: "hook", lvl: "12", q: "What's available to you that isn't available to anyone else?", o: [
          { t: "Your actual weekend plans", ok: 0, v: "fine", w: "Accurate. Beige." },
          { t: "Everything she's already told you", ok: 1, v: "saw", w: "Two days ago she handed you a bit. Use it." },
          { t: "A chance to suggest meeting", ok: 0, v: "fine", w: "Possible, but you've skipped the free gift." },
          { t: "A compliment", ok: 0, v: "npc", w: "Always your fallback, isn't it." }
        ] },
        { k: "angle", lvl: "123", q: "Move.", o: [
          { t: "CALLBACK", d: "Bring back the board-game warning", ok: 1, v: "callback", w: "This is what fluency sounds like. She'll notice immediately." },
          { t: "ANSWER STRAIGHT", d: "Tell her the plans", ok: 0, v: "fine", w: "Nothing wrong. Nothing memorable." },
          { t: "NEW JOKE", d: "Start something fresh", ok: 0, v: "fine", w: "Why build new when she gave you a foundation?" },
          { t: "ASK HER BACK", d: "“You?”", ok: 0, v: "closed", w: "One word of effort and a returned serve. Weak." }
        ] },
        { k: "build", lvl: "23", sl: [
          { label: "OBSERVATION", o: [{ t: "Mostly recovering from the board-game warning", ok: 1 }, { t: "Not much, you?", ok: 0 }, { t: "Just seeing friends", ok: 0 }] },
          { label: "TWIST", o: [{ t: "which I've decided to treat as pre-season training", ok: 1 }, { t: "it made me laugh", ok: 0 }, { t: "you're funny", ok: 0 }] },
          { label: "THREAD", o: [{ t: "What are we playing, and how badly am I going to lose?", ok: 1 }, { t: "What about you?", ok: 0 }, { t: "Anyway 😄", ok: 0 }] }
        ] }
      ],
      reveal: { line: "Mostly recovering from the board-game warning, which I've decided to treat as pre-season training. What are we playing, and how badly am I going to lose?", why: "A callback proves you were listening two days ago, and it smuggles in a date without asking for one." }
    }),

    // ── PASS cards. Sometimes the correct move is not to manufacture anything. ──
    s("ll_pass_empty", {
      cat: "B", tier: 1, concept: "restraint", pack: "HINGE CLASSICS", worth: 0,
      sit: "Two group photos, one blurry sunset, bio: “Just ask.”",
      card: { photo: "Three people at a wedding. Unclear which one she is. Sunset. A car.", prompt: "About me", line: "Just ask x" },
      steps: [
        { k: "hook", lvl: "123", q: "You pressed RESPOND. Fine. What's here?", o: [
          { t: "Nothing much, honestly", ok: 1, v: "restraint", w: "Correct, and worth admitting. A pass costs you nothing." },
          { t: "The wedding", ok: 0, v: "npc", w: "Whose wedding? You can't see her." },
          { t: "The sunset", ok: 0, v: "npc2", w: "You're about to compliment weather." },
          { t: "You could ask what she's into", ok: 0, v: "interview", w: "Her bio said “just ask” and you've decided to obey." }
        ] }
      ],
      reveal: { line: "[passed]", why: "There is no clever line hiding in three group photos. You do not owe every profile a joke — that instinct is what makes men send eleven of them a day." }
    }),

    s("ll_pass_dry", {
      cat: "B", tier: 3, concept: "restraint", pack: "DRY TEXTER", worth: 0,
      sit: "Great photos. Every prompt answered with one word. “Sunday: sleep.”",
      card: { photo: "Four excellent photos, no context in any of them.", prompt: "Typical Sunday", line: "sleep" },
      steps: [
        { k: "hook", lvl: "123", q: "You pressed RESPOND. What are you actually working with?", o: [
          { t: "One word and four photos", ok: 1, v: "restraint", w: "You can try. Just know you're supplying both halves of the conversation." },
          { t: "A chance to be the funniest man she's matched with", ok: 0, v: "tryhard", w: "Ah. The audition." },
          { t: "Her photos", ok: 0, v: "npc", w: "So a comment on her appearance. Bold." },
          { t: "A shared love of sleeping", ok: 0, v: "dead", w: "You and every human." }
        ] }
      ],
      reveal: { line: "[passed]", why: "A profile that gives you one word will usually reply with one word. Passing is not defeat — it's the whole point of having taste." }
    }),

    // ═══════════════════════════════════════════════════════════════════════════
    // FLAGGED PROFILES — the read IS the round.
    // A trap looks ordinary and is not. A gem looks ordinary and is. The tells are
    // always on the card before you decide, which is what makes passing a skill
    // instead of a coin flip. Respond or pass, the alert names what was there.
    // ═══════════════════════════════════════════════════════════════════════════
    s("ll_trap_forever", {
      cat: "N", tier: 1, concept: "notice", pack: "READ THE CARD", worth: 1,
      sit: "Warm, friendly, three exclamation marks. Something about the timeline is off.",
      card: { photo: "Sunny selfie, genuine smile, a mug that says BEST GIRLFRIEND.", prompt: "My love language is", line: "Quality time!! Like ALL of it!! I'm told I'm intense but I just care a lot 🥰" },
      flag: { kind: "trap", title: "She has already named your children.",
        tells: [
          "\u201cALL of it\u201d, in capitals, about your time specifically.",
          "\u201cI'm told I'm intense\u201d — told by whom, and how many of them.",
          "The mug pre-dates you. Someone bought that for someone."
        ],
        onRespond: "You said hi. It is 3am and you are on a video call explaining where you were between 7 and 9.",
        onPass: "You noticed that \u201cintense\u201d was doing a lot of work in that sentence. Good.",
        cta: "Retreat" },
      steps: [], reveal: { line: "[nothing]", why: "Warmth is not the warning. The quantity is." }
    }),
    s("ll_trap_snakes", {
      cat: "N", tier: 1, concept: "notice", pack: "READ THE CARD", worth: 1,
      sit: "Interesting, outdoorsy, a hobby she mentions lightly and does not explain.",
      card: { photo: "Reading in bed, cosy lamp, patterned blanket. The pattern is moving.", prompt: "Two truths and a lie", line: "I've never been to Rome · my flat has 11 residents · I hate camping" },
      flag: { kind: "trap", title: "Eleven residents. She lives alone.",
        tells: [
          "Eleven residents, one bedroom, no mention of flatmates.",
          "\u201cI hate camping\u201d is the lie. She sleeps somewhere warmer than a tent \u2014 with company.",
          "That blanket has scales."
        ],
        onRespond: "Second date is at hers. Something is loose. She says it's fine. She says they always come back.",
        onPass: "You did the arithmetic before you did the flirting. That is the correct order.",
        cta: "Retreat" },
      steps: [], reveal: { line: "[nothing]", why: "Anyone can tell you what they love. Count what they own." }
    }),
    s("ll_trap_ex", {
      cat: "B", tier: 1, concept: "notice", pack: "READ THE CARD", worth: 1,
      sit: "Sharp, funny, clearly smart. Every joke has the same target.",
      card: { photo: "Rooftop, glass of wine, laughing at something off camera.", prompt: "Don't message me if", line: "you're anything like Daniel. Or Tom. Or the other Daniel. I'll explain on the date, it's genuinely funny" },
      flag: { kind: "trap", title: "You are auditioning for a role in a trial.",
        tells: [
          "Three men named before you have said a word.",
          "\u201cI'll explain on the date\u201d \u2014 the date is the explanation.",
          "\u201cIt's genuinely funny\u201d is what people say when it is not."
        ],
        onRespond: "Four hours on Daniel. Both Daniels. You have not been asked one question about yourself.",
        onPass: "You spotted that the profile was about other people. Nothing in it was about her.",
        cta: "Retreat" },
      steps: [], reveal: { line: "[nothing]", why: "A profile that litigates its past is telling you the plan for the evening." }
    }),
    s("ll_trap_project", {
      cat: "A", tier: 1, concept: "calibration", pack: "READ THE CARD", worth: 1,
      sit: "Lovely photos. Kind face. One line about what she's looking for.",
      card: { photo: "Farmers market, linen, holding coriander like it's a bouquet.", prompt: "Looking for", line: "someone with potential. I'm very good at seeing what people could be 💫" },
      flag: { kind: "trap", title: "You are the project.",
        tells: [
          "\u201cPotential\u201d is not a compliment. It is a renovation quote.",
          "\u201cWhat people COULD be\u201d \u2014 the present tense is missing entirely.",
          "\u201cI'm very good at\u201d it, which means she has done it before, repeatedly."
        ],
        onRespond: "Month three. Your friends are wrong for you, your jacket is wrong for you, and you are nearly ready.",
        onPass: "You noticed nobody in that sentence was being liked as they currently are.",
        cta: "Retreat" },
      steps: [], reveal: { line: "[nothing]", why: "Being seen and being renovated feel identical for about six weeks." }
    }),
    s("ll_trap_chaos", {
      cat: "V", tier: 1, concept: "notice", pack: "READ THE CARD", worth: 1,
      sit: "Fun. Genuinely fun. Also six cities in fourteen months.",
      card: { photo: "Airport floor, three bags, 2am energy, delighted.", prompt: "A random fact I love", line: "I've moved 6 times since last spring. New job every time! I get bored of everything eventually 🙃" },
      flag: { kind: "trap", title: "You are on the list of things.",
        tells: [
          "Six moves, six jobs, fourteen months.",
          "\u201cI get bored of EVERYTHING eventually.\u201d She has told you the ending.",
          "The upside-down smile is doing the apologising."
        ],
        onRespond: "Eleven weeks. Then a very kind message about how she's not in a place to be a person right now.",
        onPass: "She wrote the ending in the profile and you read it. That is all this ever takes.",
        cta: "Retreat" },
      steps: [], reveal: { line: "[nothing]", why: "People rarely hide the pattern. They list it as a fun fact." }
    }),

    s("ll_gem_goth", {
      cat: "N", tier: 1, concept: "notice", pack: "HIDDEN GEM", worth: 1,
      sit: "Black on black, unsmiling, one photo. Most men swipe past on principle.",
      card: { photo: "Doorway, all black, blunt fringe, deadpan. A library card is visible in her hand.", prompt: "The way to win me over", line: "correct use of a semicolon. I run a book club. It has two rules and one of them is about punctuality" },
      flag: { kind: "gem", title: "Freak in the sheets.",
        tells: [
          "She runs something. Organised, and comfortable telling people so.",
          "Two rules, one about punctuality \u2014 she has standards and finds them funny.",
          "\u201cCorrect use of a semicolon\u201d is an invitation, and it is a low bar you can clear."
        ],
        onRespond: "Correct. Deadpan is not cold, it is a filter, and you just passed through it.",
        onPass: "You swiped past the most interesting person in the deck because she wasn't smiling.",
        cta: "Go, soldier" },
      steps: [
        { k: "hook", lvl: "123", q: "One line. What do you actually go at?", o: [
          { t: "The other rule of the book club", ok: 2, v: "sharp", w: "She left a gap on purpose. You reached into it." },
          { t: "The semicolon", ok: 1, v: "saw", w: "Fine, and about eleven men will try it." },
          { t: "Her outfit", ok: 0, v: "npc", w: "You reviewed the aesthetic. She's heard it." },
          { t: "Ask what she's reading", ok: 0, v: "interview", w: "Question one of a customs form." }
        ] }
      ],
      reveal: { line: "What's the second rule, and how many people have been thrown out under it?", why: "You took the deliberate gap and gave her a story to tell." }
    }),
    s("ll_gem_admin", {
      cat: "V", tier: 1, concept: "specificity", pack: "HIDDEN GEM", worth: 1,
      sit: "Beige. Genuinely beige. Three photos at weddings that aren't hers.",
      card: { photo: "Wedding guest, sensible dress, holding two drinks and looking straight down the lens.", prompt: "My most controversial opinion", line: "the buffet is the only part of a wedding that matters and I will be reviewing it" },
      flag: { kind: "gem", title: "Freak in the sheets.",
        tells: [
          "\u201cI will be reviewing it\u201d \u2014 present tense, deadly serious, entirely a joke.",
          "Two drinks. One is not hers, or both are.",
          "Beige clothes, unbeige sentence. Read the sentence."
        ],
        onRespond: "Correct. Boring photos, filthy sense of humour. The photos are the disguise.",
        onPass: "You judged four photos and skipped the only line in the deck with a punchline in it.",
        cta: "Go, soldier" },
      steps: [
        { k: "hook", lvl: "123", q: "She's handed you a bit. What do you do with it?", o: [
          { t: "Ask for her lowest ever buffet score", ok: 2, v: "sharp", w: "You took the review seriously, which is the joke." },
          { t: "Agree that buffets matter", ok: 1, v: "closed", w: "Agreement without escalation. She's still waiting." },
          { t: "Say you love weddings", ok: 0, v: "npc", w: "Nobody loves weddings." },
          { t: "Compliment the dress", ok: 0, v: "target", w: "There was a joke right there and you complimented the fabric." }
        ] }
      ],
      reveal: { line: "Lowest score you've ever given, and what did they do to earn it?", why: "You treated her bit as real. That is the whole trick with dry people." }
    }),
    s("ll_gem_quiet", {
      cat: "A", tier: 1, concept: "thread", pack: "HIDDEN GEM", worth: 1,
      sit: "Two photos, no bio to speak of, one answer written like a text she nearly deleted.",
      card: { photo: "Kitchen, morning light, holding a very large and slightly ridiculous knife.", prompt: "I'm weirdly good at", line: "knowing exactly how long anything takes. Ask me. I'm never wrong and it annoys everyone" },
      flag: { kind: "gem", title: "Freak in the sheets.",
        tells: [
          "\u201cAsk me\u201d \u2014 she has written you your opening line and left it on the table.",
          "\u201cIt annoys everyone\u201d: she knows she's a lot and is not apologising.",
          "That knife is a professional's knife. She didn't mention the job."
        ],
        onRespond: "Correct. Quiet profile, extremely loud person. The bio was low effort because she is not on here for you.",
        onPass: "She wrote two photos and one instruction. The instruction was ASK ME.",
        cta: "Go, soldier" },
      steps: [
        { k: "hook", lvl: "123", q: "She said ask her. Ask her what?", o: [
          { t: "How long this conversation will last", ok: 2, v: "sharp", w: "You used her own gift on her. Nothing beats that." },
          { t: "How long a roast takes", ok: 1, v: "thread", w: "Follows the instruction. Slightly literal." },
          { t: "What she does for work", ok: 0, v: "interview", w: "The knife told you. You asked anyway." },
          { t: "Nothing, compliment the kitchen", ok: 0, v: "npc", w: "She gave you an instruction and you admired the tiles." }
        ] }
      ],
      reveal: { line: "How long does this conversation last, and are you ever wrong about that one?", why: "You turned her party trick on the party. She has to answer, and she wants to." }
    }),

    // ── second tranche: ordinary profiles, harder reads ────────────────────────
    s("ll_marathon", {
      cat: "V", tier: 1, concept: "restraint", pack: "SIX MONTHS OF TRAINING", worth: 0,
      sit: "She's just posted a finish-line photo. Every reply so far is the word \u201ccongrats\u201d.",
      card: { photo: "Finish line, foil blanket, absolutely destroyed and delighted.", prompt: "I'm currently obsessed with", line: "the fact I ran 42km and my only thought at the end was about a specific sandwich" },
      steps: [
        { k: "hook", lvl: "12", q: "Eleven men have said congrats. What's actually in that sentence?", o: [
          { t: "The sandwich", ok: 2, v: "sharp", w: "She buried the joke at the end and you dug it out." },
          { t: "The 42km", ok: 1, v: "npc", w: "That's the part everyone congratulates. It is also the boring part." },
          { t: "How fit she must be", ok: 0, v: "target", w: "She told you a joke and you assessed her body." },
          { t: "Ask her finish time", ok: 0, v: "interview", w: "You've turned a joke into a form." }
        ] }
      ],
      reveal: { line: "Name the sandwich. If it's not worth 42km I'm going to be very disappointed in you.", why: "The achievement was the setup. The sandwich was the punchline, and you were the only one listening." }
    }),
    s("ll_bad_photo", {
      cat: "N", tier: 1, concept: "playfulness", pack: "SHE KNOWS", worth: 0,
      sit: "Four good photos and one genuinely terrible one she has clearly left in on purpose.",
      card: { photo: "Blurred, mid-sneeze, eyes closed, holding a traffic cone for no stated reason.", prompt: "Why this photo", line: "my friends voted to keep it. I've stopped fighting them" },
      steps: [
        { k: "hook", lvl: "123", q: "She's set this up. What's the move?", o: [
          { t: "Side with the friends", ok: 2, v: "spicy", w: "You joined the bit against her, which is exactly the invitation." },
          { t: "Say it's a great photo", ok: 1, v: "closed", w: "Kind. Also ends it." },
          { t: "Ask about the traffic cone", ok: 1, v: "thread", w: "Legitimate. Slightly the obvious door." },
          { t: "Tell her she looks better in the others", ok: 0, v: "target", w: "You rated five photos out loud." }
        ] }
      ],
      reveal: { line: "Your friends are right and you should stop fighting them. What's the cone story though.", why: "Take her side against herself and then keep the door open. Two moves, one line." }
    }),
    s("ll_two_days", {
      cat: "B", tier: 2, concept: "callback", pack: "SHE CAME BACK", worth: 0,
      sit: "Two days of nothing after a good exchange. Then a photo of a badly parked car, no caption.",
      card: { photo: "A hatchback parked across two bays and a bit of pavement.", prompt: null, line: "[no text \u2014 just the photo]" },
      steps: [
        { k: "hook", lvl: "123", q: "No caption. What is she actually doing?", o: [
          { t: "Continuing a joke from two days ago", ok: 2, v: "callback", w: "Correct. She'd never send this cold. Go back and find it." },
          { t: "Testing whether you're still here", ok: 1, v: "saw", w: "Also true. But there's a specific reference to catch." },
          { t: "Asking about parking", ok: 0, v: "dead", w: "She is not asking about parking." },
          { t: "Nothing, she's bored", ok: 0, v: "npc", w: "People who are bored send nothing, not this." }
        ] }
      ],
      reveal: { line: "You've been looking for this car for two days, haven't you.", why: "An uncaptioned photo is always a callback. Answer the reference, not the image." }
    }),
    s("ll_overshare", {
      cat: "A", tier: 2, concept: "calibration", pack: "TOO MUCH, TOO EARLY", worth: 0,
      sit: "Message four, and she's just told you something quite heavy about her year.",
      card: { photo: null, prompt: "Her message", line: "sorry that was a lot for a Tuesday. anyway. how was YOUR week 😅" },
      steps: [
        { k: "hook", lvl: "123", q: "She's apologising and handing you an exit. Do you take it?", o: [
          { t: "Refuse the exit, briefly", ok: 2, v: "seen", w: "One sentence that says it wasn't too much, then move. Not a therapy session." },
          { t: "Take the exit and answer about your week", ok: 1, v: "fine", w: "Safe. She'll notice you took the door." },
          { t: "Match it with something heavier", ok: 0, v: "sauce", w: "Now it's a competition and nobody wins those." },
          { t: "Tell her she's so strong", ok: 0, v: "hallmark", w: "Straight off a fridge magnet." }
        ] }
      ],
      reveal: { line: "It wasn't a lot, and you don't have to do the 😅. My week was mostly a fight with a printer.", why: "Decline the apology in half a line, then lighten it yourself. That is calibration." }
    }),
    s("ll_voice_note", {
      cat: "V", tier: 2, concept: "reciprocity", pack: "SHE SENT AUDIO", worth: 0,
      sit: "A 14-second voice note. She is laughing in it. You now have to decide what you are.",
      card: { photo: null, prompt: "Her voice note", line: "[14s \u2014 she's on a bus, explaining very badly why she's late, losing it halfway through]" },
      steps: [
        { k: "hook", lvl: "123", q: "She escalated the medium. What now?", o: [
          { t: "Send one back, worse", ok: 2, v: "pulse", w: "Meet the escalation and lose the fight on purpose. That's the game." },
          { t: "Text back something funny", ok: 1, v: "fine", w: "Fine, but you stepped down a level and she'll feel it." },
          { t: "Say \u201chaha loved that\u201d", ok: 0, v: "flat", w: "A receipt for a voice note." },
          { t: "Point out she was hard to hear", ok: 0, v: "cold", w: "Technical feedback on a gift." }
        ] }
      ],
      reveal: { line: "[voice note] \u2014 same length, worse story, audibly worse bus", why: "Whoever raises the medium is asking you to raise it back. Pay in the same currency." }
    }),
    s("ll_group_photo", {
      cat: "N", tier: 2, concept: "angle", pack: "WHICH ONE IS SHE", worth: 0,
      sit: "Every photo is a group photo. You genuinely are not sure which one she is.",
      card: { photo: "Six people on a hill, all in identical rain jackets, faces mostly hood.", prompt: "You should not go out with me if", line: "you need to be able to identify me. Nobody can. It's a whole thing" },
      steps: [
        { k: "hook", lvl: "123", q: "She's pre-empted the joke. So don't make it. What instead?", o: [
          { t: "Guess confidently and commit", ok: 2, v: "spicy", w: "Wrong answer, right energy. She has to correct you, which is a reply." },
          { t: "Say you can't tell", ok: 0, v: "npc", w: "That's the joke she already made. You're second." },
          { t: "Ask which one she is", ok: 1, v: "fine", w: "Reasonable. Zero risk, zero return." },
          { t: "Compliment the group", ok: 0, v: "dead", w: "You have complimented five strangers and a hill." }
        ] }
      ],
      reveal: { line: "Third from the left, and I'd like it noted that I got that on the first go.", why: "When someone pre-empts a joke, don't tell it \u2014 do the thing the joke was protecting them from." }
    }),
    s("ll_one_line", {
      cat: "B", tier: 2, concept: "twist", pack: "NOTHING TO WORK WITH", worth: 0,
      sit: "Empty bio. One photo. One answer, three words long.",
      card: { photo: "Standing in a doorway, mid-shrug, entirely neutral expression.", prompt: "My simple pleasures", line: "leaving early" },
      steps: [
        { k: "hook", lvl: "123", q: "Three words. Is there anything in there?", o: [
          { t: "Yes \u2014 it's a confession, treat it as one", ok: 2, v: "sharp", w: "Two of the three words are doing work. Most people see a blank." },
          { t: "Ask what she means", ok: 1, v: "thread", w: "Opens it. Slightly hands the work back to her." },
          { t: "Nothing there, ask about the photo", ok: 0, v: "npc", w: "There was plenty there." },
          { t: "Say you also like leaving early", ok: 0, v: "flat", w: "Two people agreeing about doors." }
        ] }
      ],
      reveal: { line: "Leaving early is the most honest thing anyone has written on here. What's the earliest you've ever left something?", why: "A short answer is not an empty one. Three words chosen carefully beat a paragraph." }
    }),
    s("ll_she_asked", {
      cat: "A", tier: 3, concept: "specificity", pack: "SHE ASKED FIRST", worth: 0,
      sit: "She has opened. It is a good opener, and it is about something you actually wrote.",
      card: { photo: null, prompt: "Her opener", line: "ok explain the 'structurally optimistic' flat, I've been thinking about it since Tuesday" },
      steps: [
        { k: "hook", lvl: "123", q: "She's been thinking about it since Tuesday. What does that tell you?", o: [
          { t: "Answer properly and give her the next hook", ok: 2, v: "sharp", w: "She invested three days. Pay it back in full, then leave her something." },
          { t: "Answer the question", ok: 1, v: "closed", w: "Complete. Also a full stop." },
          { t: "Joke and deflect", ok: 0, v: "tryhard", w: "She asked a real question. Deflecting is throwing it away." },
          { t: "Say \u201chaha long story\u201d", ok: 0, v: "dead", w: "You have declined a gift, in writing." }
        ] }
      ],
      reveal: { line: "The floor slopes enough that I keep everything round in one corner. Three days of thinking about my flat is a bigger commitment than my landlord has ever made.", why: "Answer it fully, then hand back something she can pick up. Never end on a full stop when she's leaned in." }
    })
  ];

  // ═══════════════════════════════════════════════════════════════════════════
  // WORDS OF AFFIRMATION — NOTICE · NAME · IMPACT
  // ═══════════════════════════════════════════════════════════════════════════
  var WA = [
    s("wa_gym", {
      cat: "N", tier: 0, concept: "consistency",
      sit: "She's been going to the gym three mornings a week for two months.",
      steps: [
        { k: "notice", lvl: "123", q: "What is actually worth noticing here?", o: [
          { t: "She looks better", ok: 0, v: "target", w: "You've reviewed the results. She did the work." },
          { t: "She's stayed consistent for two months", ok: 1, v: "seen", w: "That's the invisible part, and the hard part." },
          { t: "She likes the gym", ok: 0, v: "dead", w: "She doesn't, particularly. That's what makes it impressive." },
          { t: "She's naturally athletic", ok: 0, v: "target", w: "You've just told her it came free." }
        ] },
        { k: "name", lvl: "123", q: "Name the quality underneath it.", o: [
          { t: "CONSISTENCY", ok: 1, v: "seen", w: "Yes. Two months of unglamorous mornings." },
          { t: "DISCIPLINE", ok: 2, v: "also", w: "Close cousin. Slightly colder in the mouth." },
          { t: "AMBITION", ok: 0, v: "linkedin", w: "You've turned her gym class into a career plan." },
          { t: "COMPETENCE", ok: 0, v: "fine", w: "Wrong drawer. Nobody's testing her ability here." }
        ] },
        { k: "pick", lvl: "12", q: "Which one actually lands?", o: [
          { t: "You're looking amazing.", ok: 0, v: "target", w: "Kind. Aimed at the wrong thing entirely." },
          { t: "Good job, keep going!", ok: 0, v: "potato", w: "You have successfully communicated encouragement in general." },
          { t: "Two months and you're still showing up. That's the part most people don't manage.", ok: 1, v: "beautiful", w: "Specific, true, and about her choices." },
          { t: "You're officially a gym girl now.", ok: 0, v: "fine", w: "A label, not a compliment." }
        ] },
        { k: "impact", lvl: "23", q: "Now the bit men skip: what did it do to you?", o: [
          { t: "It's made me want to be less lazy, honestly.", ok: 1, v: "beautiful", w: "Impact, and it costs you something to say. Good." },
          { t: "I'm proud of you.", ok: 2, v: "also", w: "Fine. Slightly parental if it's all you've got." },
          { t: "It's impressive.", ok: 0, v: "closed", w: "A verdict. She can't do anything with a verdict." },
          { t: "Your resilience through this journey has been—", ok: 0, v: "linkedin", w: "Stop." }
        ] },
        { k: "build", lvl: "23", q: "Say it. Notice, quality, impact.", sl: [
          { label: "NOTICE", o: [{ t: "Two months of 6am and you're still going", ok: 1 }, { t: "You look great lately", ok: 0 }, { t: "Well done on the gym", ok: 0 }] },
          { label: "QUALITY", o: [{ t: "which is the bit most people quietly drop", ok: 1 }, { t: "you're so dedicated", ok: 0 }, { t: "you're naturally sporty", ok: 0 }] },
          { label: "IMPACT", o: [{ t: "and it's quietly made me want to sort myself out", ok: 1 }, { t: "keep it up!", ok: 0 }, { t: "I'm proud of you.", ok: 0 }] }
        ] }
      ],
      reveal: { line: "Two months of 6am and you're still going — which is the bit most people quietly drop. It's quietly made me want to sort myself out.", why: "You named the consistency, not the body, and you told her what it did to you. That second half is what makes it land." }
    }),

    s("wa_meeting", {
      cat: "B", tier: 0, concept: "thoughtfulness",
      sit: "She texted you at 8am to say good luck with the meeting you mentioned last week.",
      steps: [
        { k: "notice", lvl: "123", q: "What's worth noticing?", o: [
          { t: "She has a good memory", ok: 0, v: "fine", w: "Nearly. Memory isn't the point — choosing to use it is." },
          { t: "She remembered a small thing that mattered to you", ok: 1, v: "seen", w: "That's it. Small, deliberate, easily skipped." },
          { t: "She texted early", ok: 0, v: "dead", w: "Timekeeping." },
          { t: "She likes you", ok: 0, v: "fine", w: "True and completely unspecific." }
        ] },
        { k: "name", lvl: "123", q: "The quality?", o: [
          { t: "THOUGHTFULNESS", ok: 1, v: "seen", w: "Yes. Attention, spent on purpose." },
          { t: "KINDNESS", ok: 2, v: "also", w: "Also true. Slightly broader." },
          { t: "RELIABILITY", ok: 0, v: "fine", w: "Different word. She wasn't fulfilling a duty." },
          { t: "GENEROSITY", ok: 0, v: "fine", w: "Nothing was given away here except attention." }
        ] },
        { k: "pick", lvl: "12", q: "Which version does she feel?", o: [
          { t: "Thanks! 🙏", ok: 0, v: "potato", w: "You've acknowledged receipt." },
          { t: "That's so sweet of you.", ok: 0, v: "fine", w: "Nothing wrong. Also what you'd say to a colleague." },
          { t: "I mentioned that once, last week. You remembered. That made my morning.", ok: 1, v: "beautiful", w: "Specific, and it names the effect." },
          { t: "Your emotional attentiveness really is remarkable.", ok: 0, v: "hallmark", w: "Nobody has spoken like this outside a greeting card." }
        ] },
        { k: "impact", lvl: "23", q: "What did it do?", o: [
          { t: "It made me feel properly looked after.", ok: 1, v: "beautiful", w: "Plain words, real feeling. That's the target." },
          { t: "It was nice.", ok: 0, v: "potato", w: "Nice. The most forgettable word in the language." },
          { t: "It calmed me down before I went in.", ok: 2, v: "also", w: "Also excellent — concrete, which is even better." },
          { t: "You're the best.", ok: 0, v: "fine", w: "A trophy, not a sentence." }
        ] },
        { k: "build", lvl: "23", sl: [
          { label: "NOTICE", o: [{ t: "I mentioned that meeting once, in passing", ok: 1 }, { t: "Thanks for the message", ok: 0 }, { t: "You're so lovely", ok: 0 }] },
          { label: "QUALITY", o: [{ t: "and you were the only person who remembered it", ok: 1 }, { t: "you're very thoughtful", ok: 0 }, { t: "you've got a great memory", ok: 0 }] },
          { label: "IMPACT", o: [{ t: "It made me feel really looked after this morning.", ok: 1 }, { t: "So thanks!", ok: 0 }, { t: "You're the best 😊", ok: 0 }] }
        ] }
      ],
      reveal: { line: "I mentioned that meeting once, in passing, and you were the only person who remembered it. It made me feel really looked after this morning.", why: "Tiny thing, named exactly, plus what it did to you. She'll know you were paying attention too." }
    }),

    s("wa_potato", {
      cat: "A", tier: 0, concept: "specificity",
      sit: "RESCUE THE POTATO. She's just shown you the thing she's been working on for three weeks. You said: “nice”.",
      steps: [
        { k: "potato", lvl: "123", q: "The potato has spoken. Upgrade it.", o: [
          { t: "Nice, well done!", ok: 0, v: "potato", w: "You've added an adverb. The potato remains a potato." },
          { t: "Three weeks of evenings and it actually works. I'd have given up in week one.", ok: 1, v: "beautiful", w: "Specific, admiring, and slightly self-deprecating. Good." },
          { t: "This is amazing, you're so talented!!", ok: 0, v: "much", w: "Volume is not specificity." },
          { t: "I'm really proud of you for this.", ok: 2, v: "also", w: "Warmer than nice. Still no detail in it." }
        ] },
        { k: "notice", lvl: "12", q: "What could you actually see in it?", o: [
          { t: "That it looks good", ok: 0, v: "potato", w: "Back to the potato." },
          { t: "The specific hard part she solved", ok: 1, v: "seen", w: "Yes. Find the difficult bit and name it." },
          { t: "That she's talented", ok: 0, v: "hallmark", w: "You've handed her a label instead of a mirror." },
          { t: "That she worked hard", ok: 0, v: "fine", w: "Closer, still vague. Which part was hard?" }
        ] },
        { k: "build", lvl: "23", sl: [
          { label: "NOTICE", o: [{ t: "You've been on this three weeks", ok: 1 }, { t: "This is really nice", ok: 0 }, { t: "Wow!", ok: 0 }] },
          { label: "QUALITY", o: [{ t: "and the fiddly bit in the middle is the part you refused to fudge", ok: 1 }, { t: "you're so talented", ok: 0 }, { t: "you're amazing at this", ok: 0 }] },
          { label: "IMPACT", o: [{ t: "I'd have taken the shortcut on day two.", ok: 1 }, { t: "Well done!!", ok: 0 }, { t: "So proud 🥰", ok: 0 }] }
        ] }
      ],
      reveal: { line: "You've been on this three weeks, and the fiddly bit in the middle is the part you refused to fudge. I'd have taken the shortcut on day two.", why: "One detail beats three adjectives. Naming the hard part proves you looked." }
    }),

    s("wa_promo", {
      cat: "N", tier: 1, concept: "effort",
      sit: "WRONG TARGET. She's been promoted. She's told you over dinner, still in her work clothes.",
      steps: [
        { k: "target", lvl: "123", q: "Four things you could praise. Only one is the point.", o: [
          { t: "How good she looks celebrating", ok: 0, v: "target", w: "She got promoted. You complimented her outfit." },
          { t: "The persistence it took to get there", ok: 1, v: "beautiful", w: "The thing she actually did. Praise that." },
          { t: "The new salary", ok: 0, v: "fine", w: "You've congratulated her employer's budget." },
          { t: "That they finally noticed her", ok: 0, v: "target", w: "You've made it about their judgement, not her work." }
        ] },
        { k: "name", lvl: "123", q: "Which word fits what she did?", o: [
          { t: "PERSISTENCE", ok: 1, v: "seen", w: "Eighteen months of it, most of it invisible." },
          { t: "COMPETENCE", ok: 2, v: "also", w: "Also true. Slightly cooler, still lands." },
          { t: "LUCK", ok: 0, v: "target", w: "Astonishing choice." },
          { t: "AMBITION", ok: 0, v: "linkedin", w: "Now she's a growth story." }
        ] },
        { k: "impact", lvl: "23", q: "And you?", o: [
          { t: "I've watched you not give up on this for a year and a half.", ok: 1, v: "beautiful", w: "Witness testimony. Nobody else can give her that." },
          { t: "Congratulations!", ok: 0, v: "potato", w: "Correct. Also what her dentist will say." },
          { t: "We should celebrate.", ok: 2, v: "also", w: "Good instinct. Say the other thing first." },
          { t: "I always knew you'd get it.", ok: 0, v: "fine", w: "Makes your prediction the headline and erases the difficulty." }
        ] },
        { k: "build", lvl: "23", sl: [
          { label: "NOTICE", o: [{ t: "I've watched you go back at this for eighteen months", ok: 1 }, { t: "Congratulations!", ok: 0 }, { t: "You look great tonight", ok: 0 }] },
          { label: "QUALITY", o: [{ t: "including the two times it clearly wasn't going to happen", ok: 1 }, { t: "you're so ambitious", ok: 0 }, { t: "you deserved it", ok: 0 }] },
          { label: "IMPACT", o: [{ t: "You worked so hard for this. I'm proud of you.", ok: 1 }, { t: "Big salary now! 😄", ok: 0 }, { t: "I always knew you would.", ok: 0 }] }
        ] }
      ],
      reveal: { line: "I've watched you go back at this for eighteen months, including the two times it clearly wasn't going to happen. You worked so hard for this. I'm proud of you.", why: "Plain language at the end on purpose. She doesn't need eloquence, she needs a witness." }
    }),

    s("wa_dinner", {
      cat: "A", tier: 1, concept: "care",
      sit: "She cooked dinner after a day that visibly wrecked her.",
      steps: [
        { k: "notice", lvl: "123", q: "What's worth noticing?", o: [
          { t: "The food is good", ok: 0, v: "potato", w: "You've reviewed a meal." },
          { t: "She did it while running on empty", ok: 1, v: "seen", w: "The cost is the point. Name the cost." },
          { t: "She likes cooking", ok: 0, v: "dead", w: "Not tonight she didn't." },
          { t: "She's tidied up too", ok: 0, v: "fine", w: "Also true. Smaller." }
        ] },
        { k: "pick", lvl: "12", q: "Which one does she actually feel?", o: [
          { t: "Thanks, it was nice.", ok: 0, v: "potato", w: "She won't remember it tomorrow." },
          { t: "You didn't have to do that.", ok: 0, v: "fine", w: "You've turned her kindness into a mistake she made." },
          { t: "Thank you for cooking — I know you were completely done in and you still did it.", ok: 1, v: "beautiful", w: "Names what she did and what it cost. That second half is the whole trick." },
          { t: "You're honestly the most nurturing person I know.", ok: 0, v: "hallmark", w: "Greeting card. Also faintly like a job description." }
        ] },
        { k: "impact", lvl: "23", q: "Add the effect. Don't oversell.", o: [
          { t: "Coming home to that after my own day was the best part of it.", ok: 1, v: "beautiful", w: "Proportionate and specific." },
          { t: "I don't know what I'd do without you.", ok: 0, v: "much", w: "She made pasta. She did not donate a kidney." },
          { t: "Really appreciate it.", ok: 2, v: "also", w: "Small and honest. Fine for a small thing." },
          { t: "You're too good to me.", ok: 0, v: "fine", w: "Now she has to reassure you. Again." }
        ] }
      ],
      reveal: { line: "Thank you for cooking — I know you were completely done in and you still did it. Coming home to that was the best part of my day.", why: "Effort plus cost plus effect, in ordinary words. Nothing here needs a thesaurus." }
    }),

    s("wa_boss", {
      cat: "B", tier: 1, concept: "courage",
      sit: "She tells you she finally said the difficult thing to her manager. Her hands are still shaking a bit.",
      steps: [
        { k: "notice", lvl: "123", q: "What happened here?", o: [
          { t: "She won an argument", ok: 0, v: "fine", w: "Not the point, and possibly not true." },
          { t: "She did something that frightened her", ok: 1, v: "seen", w: "Yes. The shaking hands are the story." },
          { t: "Her manager is difficult", ok: 0, v: "dead", w: "You've made it about him." },
          { t: "She's assertive", ok: 0, v: "linkedin", w: "Performance review language." }
        ] },
        { k: "name", lvl: "123", q: "The word.", o: [
          { t: "COURAGE", ok: 1, v: "seen", w: "Correct, and rarely said out loud to adults." },
          { t: "CONFIDENCE", ok: 0, v: "fine", w: "Wrong word. Confidence wouldn't have shaken." },
          { t: "RESILIENCE", ok: 0, v: "linkedin", w: "You've reached for the LinkedIn drawer." },
          { t: "HONESTY", ok: 2, v: "also", w: "Also defensible. Slightly misses the fear." }
        ] },
        { k: "impact", lvl: "23", q: "Then what?", o: [
          { t: "You were scared and you did it anyway. That's the whole definition.", ok: 1, v: "beautiful", w: "You named the fear instead of erasing it." },
          { t: "See, that wasn't so bad!", ok: 0, v: "fine", w: "You've decided for her how bad it was." },
          { t: "Good for you!", ok: 0, v: "potato", w: "The potato speaks." },
          { t: "I'd have said it weeks ago.", ok: 0, v: "target", w: "Congratulations on your own imaginary bravery." }
        ] },
        { k: "build", lvl: "23", sl: [
          { label: "NOTICE", o: [{ t: "Your hands were still going when you told me", ok: 1 }, { t: "Well done for speaking up", ok: 0 }, { t: "That's great news", ok: 0 }] },
          { label: "QUALITY", o: [{ t: "which means you were frightened and did it anyway", ok: 1 }, { t: "you're so resilient", ok: 0 }, { t: "you're braver than me", ok: 0 }] },
          { label: "IMPACT", o: [{ t: "I've been putting off something smaller for a month.", ok: 1 }, { t: "So proud of you!", ok: 0 }, { t: "See? Wasn't so bad.", ok: 0 }] }
        ] }
      ],
      reveal: { line: "Your hands were still going when you told me, which means you were frightened and did it anyway. I've been putting off something smaller for a month.", why: "Courage needs the fear left in. Removing the fear removes the compliment." }
    }),

    s("wa_piano", {
      cat: "N", tier: 2, concept: "consistency",
      sit: "She's practised piano most evenings for six weeks. She's still bad at it.",
      steps: [
        { k: "notice", lvl: "123", q: "Careful. What deserves recognition?", o: [
          { t: "She's improving fast", ok: 0, v: "fine", w: "She isn't, and she knows it. Don't lie warmly." },
          { t: "Six weeks of evenings with almost nothing to show", ok: 1, v: "seen", w: "That's harder than talent and nobody praises it." },
          { t: "She's musical", ok: 0, v: "target", w: "Flattery aimed at the wrong thing." },
          { t: "It's a nice hobby", ok: 0, v: "potato", w: "Nice. There it is again." }
        ] },
        { k: "name", lvl: "123", q: "Same word as the gym card, if you were paying attention.", o: [
          { t: "CONSISTENCY", ok: 1, v: "seen", w: "Yes. Different situation, same concept. That's the transfer." },
          { t: "TALENT", ok: 0, v: "target", w: "The opposite of what's happening." },
          { t: "PATIENCE", ok: 2, v: "also", w: "Also right, and arguably kinder here." },
          { t: "CREATIVITY", ok: 0, v: "fine", w: "Nothing creative has occurred yet, by her own account." }
        ] },
        { k: "build", lvl: "23", sl: [
          { label: "NOTICE", o: [{ t: "Six weeks of practising most nights", ok: 1 }, { t: "You're getting really good", ok: 0 }, { t: "You're so musical", ok: 0 }] },
          { label: "QUALITY", o: [{ t: "with almost nothing to show yet, which is the boring part everyone quits at", ok: 1 }, { t: "you've got real talent", ok: 0 }, { t: "it sounds lovely", ok: 0 }] },
          { label: "IMPACT", o: [{ t: "I like that you're doing something you're not immediately good at.", ok: 1 }, { t: "Keep going!", ok: 0 }, { t: "Well done you.", ok: 0 }] }
        ] }
      ],
      reveal: { line: "Six weeks of practising most nights with almost nothing to show yet — that's the boring part everyone quits at. I like that you're doing something you're not immediately good at.", why: "Same concept as the gym card in a completely different skin. If you spotted it, it's becoming a reflex." }
    }),

    s("wa_sayless", {
      cat: "A", tier: 2, concept: "restraint",
      sit: "SAY LESS. She's just finished something that took a year. You have prepared a speech.",
      steps: [
        { k: "pick", lvl: "123", q: "Four attempts. One is a human being.", o: [
          { t: "Your demonstrated capacity for resilience throughout this journey has been genuinely inspiring to witness.", ok: 0, v: "linkedin", w: "You've nominated her for an award nobody entered." },
          { t: "You worked so hard for this. I'm proud of you.", ok: 1, v: "beautiful", w: "Short. True. Nothing in the way." },
          { t: "Words can't express how proud I am of the woman you've become.", ok: 0, v: "hallmark", w: "Nobody has spoken like this outside a greeting card." },
          { t: "Nice one!", ok: 0, v: "potato", w: "A year of work, four letters." }
        ] },
        { k: "notice", lvl: "12", q: "Why does the plain version win?", o: [
          { t: "It's shorter", ok: 0, v: "fine", w: "Length isn't the mechanism." },
          { t: "Nothing in it is performing", ok: 1, v: "seen", w: "Right. Ornament reads as distance." },
          { t: "It's more masculine", ok: 0, v: "dead", w: "No." },
          { t: "It's easier to say", ok: 0, v: "fine", w: "It isn't, actually. That's rather the point." }
        ] }
      ],
      reveal: { line: "You worked so hard for this. I'm proud of you.", why: "Emotional vocabulary is for finding the right thing to say, not for decorating it. When the feeling is big, the words get smaller." }
    }),

    s("wa_tea", {
      cat: "A", tier: 2, concept: "care",
      sit: "PROPORTION. She brought you a cup of tea while you were working.",
      steps: [
        { k: "pick", lvl: "123", q: "It's a cup of tea. Calibrate.", o: [
          { t: "Honestly, you take such good care of me. I don't deserve you.", ok: 0, v: "much", w: "She made you tea. She did not donate a kidney." },
          { t: "You're a legend. Perfect timing as well.", ok: 1, v: "beautiful", w: "Small warm response to a small warm thing. Proportion matters." },
          { t: "Cheers.", ok: 0, v: "potato", w: "Fine. Also what you'd say to a barista." },
          { t: "Thank you — you always seem to know when I've stalled.", ok: 2, v: "also", w: "Also lovely, and it notices a pattern. Works." }
        ] },
        { k: "notice", lvl: "12", q: "What's the lesson here?", o: [
          { t: "Always be specific", ok: 0, v: "fine", w: "Usually. Not the lesson on this card." },
          { t: "Match the size of the response to the size of the thing", ok: 1, v: "seen", w: "Yes. Over-affirming small things devalues the currency." },
          { t: "Say thank you more", ok: 0, v: "potato", w: "Volume again." },
          { t: "Compliment the person, not the act", ok: 0, v: "fine", w: "Not here. Here you just say something warm and get back to work." }
        ] }
      ],
      reveal: { line: "You're a legend. Perfect timing as well.", why: "If every kindness gets a monologue, none of them mean anything. Save the big words for the big things." }
    }),

    s("wa_haircut", {
      cat: "N", tier: 3, concept: "specificity",
      sit: "She's had her hair cut and keeps checking her reflection in the window.",
      steps: [
        { k: "notice", lvl: "123", q: "Read the room first. What's going on?", o: [
          { t: "She wants a compliment", ok: 0, v: "fine", w: "Close, but lazy. Everyone wants a compliment." },
          { t: "She's not sure about it and is looking for one honest read", ok: 1, v: "seen", w: "Right. Vague praise won't touch that." },
          { t: "She likes her new haircut", ok: 0, v: "dead", w: "Then why the window." },
          { t: "She's fishing", ok: 0, v: "fine", w: "Uncharitable, and it'll leak into your voice." }
        ] },
        { k: "pick", lvl: "123", q: "Which one settles it?", o: [
          { t: "Yeah, it's nice.", ok: 0, v: "potato", w: "She can hear the full stop." },
          { t: "It's shorter than I expected.", ok: 0, v: "fine", w: "True, and completely useless to her right now." },
          { t: "That really suits you — it makes you look even more like you.", ok: 1, v: "beautiful", w: "Specific enough to be believed, warm enough to help." },
          { t: "You look absolutely stunning, honestly incredible.", ok: 0, v: "much", w: "Volume where she needed accuracy. She won't believe it." }
        ] }
      ],
      reveal: { line: "That really suits you — it makes you look even more like you.", why: "Reassurance only works if it sounds like an observation. Turn the volume down and the specificity up." }
    }),

    s("wa_reliable", {
      cat: "B", tier: 3, concept: "impact",
      sit: "She's covered for you three times this month without mentioning it once.",
      steps: [
        { k: "notice", lvl: "123", q: "This one's easy to miss entirely. What is it?", o: [
          { t: "She's helpful", ok: 0, v: "potato", w: "A word from a school report." },
          { t: "She did it three times and never once collected credit", ok: 1, v: "seen", w: "The not-mentioning is the compliment. Name that." },
          { t: "She's organised", ok: 0, v: "fine", w: "Wrong quality entirely." },
          { t: "She's nice to you", ok: 0, v: "dead", w: "Enormous vagueness." }
        ] },
        { k: "name", lvl: "123", q: "Word?", o: [
          { t: "RELIABILITY", ok: 1, v: "seen", w: "Unglamorous, rarely praised, deeply felt." },
          { t: "GENEROSITY", ok: 2, v: "also", w: "Also fair. Slightly grander than the thing." },
          { t: "KINDNESS", ok: 2, v: "also", w: "Defensible. A bit soft for what she actually did." },
          { t: "LOYALTY", ok: 0, v: "much", w: "You've made a rota into a blood oath." }
        ] },
        { k: "impact", lvl: "123", q: "Land it.", o: [
          { t: "I noticed all three, and I noticed you never brought them up.", ok: 1, v: "beautiful", w: "Being seen unprompted is the rarest thing on this list." },
          { t: "Thanks for everything you do.", ok: 0, v: "hallmark", w: "A card from a leaving collection." },
          { t: "You're such a good person.", ok: 0, v: "fine", w: "A label. She can't feel a label." },
          { t: "Let me know if you need anything back.", ok: 2, v: "also", w: "Decent. Reciprocity, not affirmation. Do both." }
        ] },
        { k: "build", lvl: "23", sl: [
          { label: "NOTICE", o: [{ t: "You've covered for me three times this month", ok: 1 }, { t: "Thanks for all your help", ok: 0 }, { t: "You're so kind", ok: 0 }] },
          { label: "QUALITY", o: [{ t: "and you haven't mentioned any of them once", ok: 1 }, { t: "you're so reliable", ok: 0 }, { t: "you're a good person", ok: 0 }] },
          { label: "IMPACT", o: [{ t: "I noticed. All three.", ok: 1 }, { t: "Thanks again!", ok: 0 }, { t: "You're the best 🥰", ok: 0 }] }
        ] }
      ],
      reveal: { line: "You've covered for me three times this month and you haven't mentioned any of them once. I noticed. All three.", why: "The whole affirmation is in the last three words. Quiet effort wants a witness, not a speech." }
    })
  ];

  // A second exemplar per scenario — same grammar, different energy. Shown whenever
  // the player picks a defensible-but-different angle, and after a clean round, so the
  // lesson is the range of tone rather than one sacred sentence.
  var ALT = {
    ll_dog: "Genuine question: does he vet everyone, or am I the first to make it this far?",
    ll_fish: "Whoever agreed to hold the camera is the real story here. Was there a plan, or did this just happen to you?",
    ll_hey: "Opinion, since it's apparently compulsory: a cat that old has opinions of its own, and yours already looks unimpressed with me.",
    ll_pasta: "I'm going to need photographic evidence and at least one witness. Which dish?",
    ll_board: "Noted, and I'd like it on record that I've never lost at anything either. What are we playing?",
    ll_ski: "Talk me through the exact moment you decided the poles were optional.",
    ll_coffee: "Be honest, do you own equipment? Is there a grinder in the house with a name?",
    ll_travel: "You've teased a long story and then left the room. I'd like the unabridged version, in your own time.",
    ll_gym: "Respect. What's the actual number you're chasing, and how close is close?",
    ll_one_word: "Right, I'm going to stop carrying this and see what happens. Best thing about your week, whenever you fancy.",
    ll_interview: "I've been interviewing you like a border official. Ask me something awful about myself and we'll call it even.",
    ll_perfect: "Honestly? Your profile is very good and I've spent four minutes trying to be clever about it. So: camping. Explain yourself.",
    ll_callback: "Still recovering from the board-game warning, so I'm keeping the weekend light. What's the game, and how humiliating is this going to be?",
    wa_gym: "Eight months of getting up when you didn't want to. That's the bit I'd have failed.",
    wa_meeting: "You remembered something I mentioned once. That's a much bigger deal than you think it is.",
    wa_potato: "You refused to fudge the hard bit. That's exactly the part I'd have skipped.",
    wa_promo: "Eighteen months, two knock-backs, and you went back anyway. I'm proud of you.",
    wa_dinner: "You had nothing left and you cooked anyway. I noticed — and I'm doing the washing up without being asked.",
    wa_boss: "You did it with your hands shaking. That's braver than doing it calmly.",
    wa_piano: "Six weeks of being bad at something on purpose. Most people can't stand that for a week.",
    wa_sayless: "I'm proud of you. That's all I've got, and it's true.",
    wa_tea: "Perfect timing, as always. You seem to know when I've stalled before I do.",
    wa_haircut: "It really suits you. You look more like you, if that makes any sense.",
    wa_reliable: "Three times this month. You didn't mention one of them. I noticed all three."
  };
  LL.concat(WA).forEach(function (x) { if (ALT[x.id]) x.alt = ALT[x.id]; });

  // Profile photos (generated) + fictional names, so the round looks like the app it
  // is training you for. Chat-thread cards have no photo and keep the plain frame.
  var PIC = {
    ll_dog: ["Mara, 29", "hf_20260819_131620_2b5f12f4-8ea8-4e1c-a6a6-c4ebe9c9757c"],
    ll_fish: ["Liv, 31", "hf_20260819_131620_1a6dd2c6-b1b8-4789-9e1f-a6ea91f21898"],
    ll_hey: ["Juno, 27", "hf_20260819_131620_fa8c2ba0-cac7-4f11-a34c-725910adc16f"],
    ll_pasta: ["Elena, 30", "hf_20260819_131620_0205776f-f4c5-49c0-9ffe-58d44fa8ab6b"],
    ll_board: ["Frieda, 28", "hf_20260819_131620_3a5276a5-17f7-4f3a-87d0-a292710c0fed"],
    ll_ski: ["Nora, 32", "hf_20260819_131620_0ea98f24-ba44-46f8-a776-8a581a0a4299"],
    ll_coffee: ["Tess, 26", "hf_20260819_131620_fd651078-18c2-457c-a979-1cba40fabb54"],
    ll_travel: ["Alma, 29", "hf_20260819_131619_83f58603-2fef-4e45-84ac-922c6c093632"],
    ll_gym: ["Rosa, 27", "hf_20260819_131619_954f64aa-0a75-4113-a2bf-3764168e9bb7"],
    ll_perfect: ["Ines, 30", "hf_20260819_131620_e56d00e8-7ce3-42d4-99c7-05aebda3255b"],
    ll_pass_empty: ["Katja, 28", "hf_20260819_131620_3a8a9368-00d0-480f-a79e-7d36898aa8a6"],
    ll_pass_dry: ["Mila, 25", "hf_20260819_131620_7e87d22f-bcda-4259-b814-c90a18507cca"]
  };
  var PIC_BASE = "https://d8j0ntlcm91z4.cloudfront.net/user_32PgHXDjHlFXmhgKyUnBM4DN7Qi/";
  LL.forEach(function (x) {
    var p = PIC[x.id];
    if (p && x.card) { x.card.who = p[0]; x.card.img = PIC_BASE + p[1] + ".png"; }
  });

  var TIERS = {
    ll: ["Say Hello", "Find The Angle", "Keep It Alive", "Read The Room"],
    wa: ["Notice", "Name It", "Land It", "Under Pressure"]
  };

  // Legacy view of the deck: the SRS engine, the duel breakdown and the Playbook
  // list still read arrays [id, situation, best, cat, why, ...]. Unchanged contract.
  function legacy(mode) {
    var d = mode === "ll" ? LL : WA;
    return d.map(function (x) {
      return [x.id, x.sit, x.reveal.line, x.cat, x.reveal.why, "", "", "", ""];
    });
  }
  function byId(mode) {
    var d = mode === "ll" ? LL : WA, m = {};
    d.forEach(function (x) { m[x.id] = x; });
    return m;
  }
  // Steps for a given depth, in order.
  function stepsFor(sc, depth) {
    var d = String(depth);
    return (sc.steps || []).filter(function (st) { return (st.lvl || "123").indexOf(d) !== -1; });
  }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  // Skill and outcome are separate. A good line usually lands. Usually.
  // ── language ──────────────────────────────────────────────────────────────
  // German content lives in court-de.js as an OVERLAY keyed by scenario id, so the
  // structure is declared once, here, and never duplicated. Every getter asks the
  // overlay first, so consumers (Vocab Lover, Words of Affirmation, Court Round)
  // carry no language code of their own — they call COURT.setLang once. A scenario
  // with no translation yet stays fully English rather than going half-German.
  // ── Profile photos ─────────────────────────────────────────────────────────
  // Generated art, streamed from the CDN exactly like the faceoff clips on the
  // map. Keyed by scenario id and applied in ONE place (withImg, below), so the
  // scenario definitions stay pure content and the German overlay needs no copy
  // of them. A scenario with no entry falls back to its written photo: line, so
  // an unillustrated card still renders.
  var PBASE = "https://d8j0ntlcm91z4.cloudfront.net/user_32PgHXDjHlFXmhgKyUnBM4DN7Qi/";
  var PHOTOS = {
    ll_dog: "hf_20260819_205931_ddc4491c-aa82-4f4e-8620-d41adc16ff69.png",
    ll_fish: "hf_20260819_205931_d3e7b9ff-4565-4d7b-be62-9445e5fb414d.png",
    ll_hey: "hf_20260819_205931_5b7408c1-d61f-4a3a-a210-1adf36c104c5.png",
    ll_pasta: "hf_20260819_205931_1f29260f-85be-4104-ba9d-a8deec2d0059.png",
    ll_board: "hf_20260819_205931_c56ab7e8-b4b7-43e1-b96e-20234d85cc2f.png",
    ll_ski: "hf_20260819_205931_e4c0c383-7031-44d0-95b4-f7acf2572866.png",
    ll_coffee: "hf_20260819_205931_91f1d1af-1c2b-4981-9c70-2974882cfe14.png",
    ll_travel: "hf_20260819_205932_1960087a-8462-4fae-a462-107a179eaa1e.png",
    ll_gym: "hf_20260819_205931_a9e5fd28-f6e3-443d-896b-c7381e3f424a.png",
    ll_perfect: "hf_20260819_205931_bbad290f-a644-4d56-9a5c-489d8359443c.png",
    ll_one_word: "hf_20260819_205955_ccae6803-da29-4c45-b192-3be8666d2fe8.png",
    ll_interview: "hf_20260819_205954_cc7e966a-aacb-49be-8700-9f780e597933.png",
    ll_double: "hf_20260819_205954_a24bc553-0867-4d02-9cd9-1b3dd67c5338.png",
    ll_callback: "hf_20260819_205954_e52e7775-4884-4ee4-8fa4-06dc27241186.png",
    ll_pass_empty: "hf_20260819_205954_00d3cada-bb17-4361-bdb3-59bb9558603a.png",
    ll_pass_dry: "hf_20260819_205955_39fa194f-2f49-41b7-83b9-b9dba282d7eb.png",
    ll_trap_forever: "hf_20260819_205906_88c6e25a-2a12-42b3-8768-fcfbcd04ba3c.png",
    ll_trap_snakes: "hf_20260819_205906_87f62455-222c-4279-ab55-55a28918f0a0.png",
    ll_trap_ex: "hf_20260819_205906_89307408-7085-4b3a-96b3-09f830543a55.png",
    ll_trap_project: "hf_20260819_205907_3e026b53-67c2-46d3-979c-301116e6b8f9.png",
    ll_trap_chaos: "hf_20260819_205906_72eaaee9-71e9-403a-8710-72e29d7f9183.png",
    ll_gem_goth: "hf_20260819_205906_66b72753-2e53-4425-8f0b-a4a4a5ecd131.png",
    ll_gem_admin: "hf_20260819_205907_e4cc433f-4356-4298-a762-b9e97abf741f.png",
    ll_gem_quiet: "hf_20260819_205906_89498d10-0ea7-42a5-aafe-0bfc49d095c5.png",
    ll_marathon: "hf_20260819_205907_1ddf1d90-4e38-4bd6-b5dc-851fcff3afd8.png",
    ll_bad_photo: "hf_20260819_205906_3ad3deda-6e02-4e02-ab43-60c34ba881cb.png",
    ll_two_days: "hf_20260819_205954_bd7c58ef-7efa-4aef-815c-0e8f12696e1f.png",
    ll_group_photo: "hf_20260819_205954_dd6c72fd-40e5-4fa2-b3e1-7911f250fb6b.png",
    ll_one_line: "hf_20260819_205954_4712cf0f-91d4-4ddb-b54d-6e9c291efed7.png"
  };
  function withImg(sc) {
    if (!sc || !sc.id || !PHOTOS[sc.id]) return sc;
    var out = {}, k;
    for (k in sc) out[k] = sc[k];
    out.card = {};
    for (k in (sc.card || {})) out.card[k] = sc.card[k];
    out.card.img = PBASE + PHOTOS[sc.id];
    return out;
  }

  var LANG = "en";
  function de() { return (LANG === "de" && window.COURT_DE) ? window.COURT_DE : null; }
  function tr(sc) {
    var D = de();
    if (!D || !sc || !sc.id) return sc;
    var o = (D.scenarios || {})[sc.id];
    if (!o) return sc;
    var out = {}, k, j;
    for (k in sc) out[k] = sc[k];
    for (j in o) out[j] = o[j];
    return out;
  }
  function translated(id) { var D = de(); return !!(D && (D.scenarios || {})[id]); }

  function replyFor(quality) {
    var D = de();
    var R = (D && D.replies) ? D.replies : RP;
    var r = Math.random();
    if (quality === 2) {
      if (r < 0.5) return pick(R.laugh.concat(R.build));
      if (r < 0.72) return pick(R.warm.concat(R.poke));
      if (r < 0.86) return pick(R.polite);
      if (r < 0.95) return pick(R.flat);
      return pick(R.none);
    }
    if (quality === 1) {
      if (r < 0.18) return pick(R.laugh);
      if (r < 0.55) return pick(R.polite);
      if (r < 0.8) return pick(R.flat);
      if (r < 0.92) return pick(R.tangent);
      return pick(R.none);
    }
    if (r < 0.12) return pick(R.laugh);
    if (r < 0.32) return pick(R.polite);
    if (r < 0.7) return pick(R.flat);
    return pick(R.none);
  }
  window.COURT = {
    setLang: function (code) { LANG = code === "de" ? "de" : "en"; },
    lang: function () { return LANG; },
    translated: translated,
    // how much of a mode's deck exists in the current language
    coverage: function (m) {
      var d = m === "ll" ? LL : WA;
      if (LANG === "en") return { have: d.length, total: d.length };
      var n = 0;
      d.forEach(function (x) { if (translated(x.id)) n++; });
      return { have: n, total: d.length };
    },
    deck: function (m) { return (m === "ll" ? LL : WA).map(function (x) { return withImg(tr(x)); }); },
    byId: function (m) {
      var src = byId(m), out = {};
      for (var k in src) out[k] = withImg(tr(src[k]));
      return out;
    },
    legacy: legacy,
    stepsFor: function (sc, d) { return stepsFor(withImg(tr(sc)), d); },
    replyFor: replyFor,
    verdict: function (k) {
      var D = de();
      if (D && D.verdicts && D.verdicts[k]) return D.verdicts[k];
      return V[k] || V.fine;
    },
    tiers: function (m) {
      var D = de();
      if (D && D.tiers && D.tiers[m]) return D.tiers[m];
      return TIERS[m] || TIERS.wa;
    },
    concepts: function (m) {
      var D = de();
      if (D && D.concepts && D.concepts[m]) return D.concepts[m];
      return CONCEPTS[m] || CONCEPTS.wa;
    }
  };
  // Back-compat for anything still calling the old deck API.
  window.LOVE_DECK = function (m) { return legacy(m === "ll" ? "ll" : "wa"); };
  window.LOVE_TIERS = function (m) { return TIERS[m] || TIERS.wa; };
  window.LOVE_DE = window.LOVE_DE || {};
})();
