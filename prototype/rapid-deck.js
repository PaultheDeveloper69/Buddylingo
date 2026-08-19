// BuddyLingo — RAPID FIRE content.
//
// Her line, your four seconds of panic. Each exchange has one sharp reply, one
// that passes, and two that kill it. ok: 2 sharp · 1 survivable · 0 dead.
// `note` is what she thinks of the option you picked — that is the teaching.
//
// Tone rules for anything added here: she is quick, she tests you, and she wins
// sometimes. Suggestive is fine, explicit is not, and the dead options are dead
// because they are needy, boastful or creepy — never because she is difficult.
// Concepts match COURT.concepts("ll") so mastery lands in the same reflex table.
window.RAPID = (function () {
  var LINES = [
    { id: "r01", concept: "twist", her: "I'm going to be honest, I've never once had a good first date.",
      opts: [
        ["Bold, telling me that before I've had a chance to lower the bar.", 2, "You took her admission and made it a shared problem. She's in."],
        ["That's a lot of pressure for a Tuesday.", 1, "Fine. Safe. You didn't take the opening she handed you."],
        ["That's so sad. I'm sorry that happened to you.", 0, "You turned banter into grief counselling."],
        ["I'll be your first.", 0, "You promised something you haven't earned yet."]
      ] },
    { id: "r02", concept: "notice", her: "People tell me I'm an acquired taste.",
      opts: [
        ["So is everything worth having. Olives, whisky, silence.", 2, "Agreed with her and raised it. No reassurance, no grovelling."],
        ["I acquire fast.", 1, "Quick, and slightly pleased with itself. It'll do."],
        ["You seem lovely to me though!", 0, "She said something interesting and you handed back a participation medal."],
        ["I like literally all tastes.", 0, "Now you're a menu with no opinions."]
      ] },
    { id: "r03", concept: "restraint", her: "sorry — mad week. only just seen this",
      opts: [
        ["Survived it?", 2, "Two words, no audit of where she's been. Devastating restraint."],
        ["No stress. How mad are we talking?", 1, "Warm and curious. Slightly more words than the moment needed."],
        ["I thought you'd died. Or blocked me. Possibly both.", 0, "Funny once. Here it reads as a receipt for the two days you spent counting."],
        ["It's fine, I wasn't waiting or anything.", 0, "You were, and now she knows the exact shape of it."]
      ] },
    { id: "r04", concept: "angle", her: "My last one ended because he found my hobbies annoying.",
      opts: [
        ["Name the most annoying one. I'd like to know what I'm walking into.", 2, "You went straight at the interesting part instead of siding with her against him."],
        ["That says more about him than you.", 1, "True, kind, and the eight hundredth time she's heard it."],
        ["He sounds like an absolute idiot.", 0, "You've joined a war you know nothing about."],
        ["I'm very open-minded about hobbies.", 0, "You've applied for a job as a tolerant bystander."]
      ] },
    { id: "r05", concept: "playfulness", her: "Full disclosure: I'm only here for the free drinks.",
      opts: [
        ["Good. I'm only here to watch someone else pay for them.", 2, "You matched her frame and stayed inside the joke. That's the whole skill."],
        ["How's the haul going so far?", 1, "Playing along. Not adding anything of your own."],
        ["Haha, that's so funny!!", 0, "Laughing at a joke is not the same as being in one."],
        ["I'll buy you as many as you want.", 0, "You just paid her to stay. She noticed."]
      ] },
    { id: "r06", concept: "calibration", her: "You seem like a lot.",
      opts: [
        ["I am. Portion control is your job.", 2, "Owned it, handed her the dial. Confident without arguing."],
        ["Is that a complaint?", 1, "Fair push-back. Slightly defensive."],
        ["Sorry — I'll tone it down.", 0, "You apologised for existing. She wasn't asking you to."],
        ["You have absolutely no idea.", 0, "Menace with nothing behind it."]
      ] },
    { id: "r07", concept: "specificity", her: "Say something nice about me that isn't about how I look.",
      opts: [
        ["You interrupted me twice and were right both times.", 2, "Specific, observed, and impossible to have sent to anyone else."],
        ["You're genuinely funny.", 1, "True and generic. She'll take it and forget it."],
        ["You have a beautiful soul.", 0, "You have met her twice."],
        ["You're not like other girls.", 0, "A compliment to her at the expense of everyone she knows."]
      ] },
    { id: "r08", concept: "thread", her: "Anyway. Long week. I'm useless.",
      opts: [
        ["Useless people don't hang off cliffs for fun. Try again.", 2, "You used something she told you earlier. Callbacks beat compliments."],
        ["Everyone's useless by Thursday.", 1, "Companionable shrug. Nothing gained, nothing lost."],
        ["You're not useless!", 0, "Contradicting her feelings isn't comfort, it's admin."],
        ["Same honestly, I'm a mess.", 0, "You raced her to the bottom and won."]
      ] },
    { id: "r09", concept: "reciprocity", her: "Your turn. Tell me something embarrassing.",
      opts: [
        ["I rehearsed a voice note once. Forty seconds. Six takes.", 2, "Real, small, self-aware. You paid what she paid."],
        ["I'm not embarrassing, I'm consistent.", 1, "Cute deflection. You still owe her one."],
        ["Honestly I don't really get embarrassed.", 0, "You refused the trade. The game stops here."],
        ["You first.", 0, "She went first. That was her going first."]
      ] },
    { id: "r10", concept: "restraint", her: "Just so you know, I have a boyfriend.",
      opts: [
        ["Congratulations to him. Genuinely.", 2, "Clean, warm, gone. The only reply that costs you nothing."],
        ["Fair enough. Good talking to you.", 1, "Correct and a bit wounded. Still fine."],
        ["Does he know you're here?", 0, "You made yourself the problem in under six words."],
        ["He doesn't have to find out.", 0, "Run over. Deservedly."]
      ] },
    { id: "r11", concept: "callback", her: "So what are we actually doing about this?",
      opts: [
        ["Thursday. That wine bar you slandered.", 2, "A day, a place, and a joke she made. Nothing left for her to organise."],
        ["We should get a drink sometime.", 1, "Sometime is not a day. She'll wait for a better offer."],
        ["Whatever you want, I'm easy!", 0, "She asked you to lead and you handed the wheel back."],
        ["Send me your address.", 0, "Bold. Wrong. Alarming."]
      ] },
    { id: "r12", concept: "notice", her: "I hate small talk.",
      opts: [
        ["Then start bigger. What are you avoiding this week?", 2, "You took the complaint as an instruction and asked something real."],
        ["Agreed. Grim weather though.", 1, "The joke is right there and you took it. Points for nerve."],
        ["Me too! So what do you do for work?", 0, "You agreed and then immediately did it."],
        ["What's your favourite colour then.", 0, "Anti-small-talk that is somehow smaller."]
      ] },
    { id: "r13", concept: "playfulness", her: "I should warn you, I'm very high maintenance.",
      opts: [
        ["I've read the manual. I have notes on the warranty section.", 2, "You extended her metaphor instead of reassuring her. That's the reflex."],
        ["I've handled worse.", 1, "Confident. Also slightly rude, which is survivable."],
        ["I don't mind at all, honestly.", 0, "Permission granted by someone nobody asked."],
        ["How high are we talking, financially.", 0, "You priced her. In writing."]
      ] },
    { id: "r14", concept: "angle", her: "I only date men who can cook.",
      opts: [
        ["Then you'll want to see my one dish. I've had years to perfect it.", 2, "Turned a requirement into an invitation, and made the limitation the joke."],
        ["I can cook about three things properly.", 1, "Honest. Not doing much work."],
        ["I'm actually a brilliant cook.", 0, "Unverifiable claims are just noise."],
        ["I could learn for you.", 0, "You volunteered for coursework."]
      ] },
    { id: "r15", concept: "calibration", her: "That was almost smooth.",
      opts: [
        ["Almost is where I live. Rent's cheap.", 2, "Took the note, kept the swagger, made it funnier than her line."],
        ["I'll take almost.", 1, "Gracious. Small."],
        ["Thanks!", 0, "She tested you and you filed a receipt."],
        ["I can be a lot smoother than that.", 0, "Never announce the upgrade. Ship it."]
      ] },
    { id: "r16", concept: "specificity", her: "Why did you message me, out of interest?",
      opts: [
        ["You called your own flat structurally optimistic. I needed context.", 2, "Proof you read her. Unrepeatable to anyone else."],
        ["You seemed interesting.", 1, "Everyone seems interesting. Try again with evidence."],
        ["You're gorgeous, obviously.", 0, "True or not, it tells her you read one thing."],
        ["Boredom, mostly.", 0, "Honest. Fatal."]
      ] },
    { id: "r17", concept: "restraint", her: "I'm not sleeping with you, by the way.",
      opts: [
        ["Noted. I'll cancel the string quartet.", 2, "Unbothered, funny, no argument. The boundary cost you nothing."],
        ["That's fine — I asked you for a drink.", 1, "Correct, faintly stiff. She'll allow it."],
        ["I never said you would!", 0, "Defensive. Now it's a topic."],
        ["That's what they all say.", 0, "She's already typing take care."]
      ] },
    { id: "r18", concept: "thread", her: "You're quite hard to read.",
      opts: [
        ["Good. Keep guessing — you're doing well so far.", 2, "You kept the tension and gave her a reason to stay in the game."],
        ["I'm an open book. Badly bound.", 1, "Nice line, slightly rehearsed. Passes."],
        ["I'm actually really simple, ask me anything.", 0, "You solved the mystery she was enjoying."],
        ["Most people say that.", 0, "Now she's most people."]
      ] },

    // ── typing rounds. One word, same clock. ──────────────────────────────────
    { id: "f01", concept: "twist", her: "I should tell you now, I'm a terrible influence.",
      fill: { before: "Finally. I've been dangerously", after: ".", answers: ["behaved", "well-behaved", "good", "sober"],
        hint: "one word — agree, don't warn her off", ideal: "behaved",
        note: "You accepted the label and made your own restraint the joke." } },
    { id: "f02", concept: "calibration", her: "You're a bit much, you know that?",
      fill: { before: "And you're still", after: ".", answers: ["here", "typing", "reading", "replying"],
        hint: "one word — point at the evidence", ideal: "here",
        note: "The shortest possible proof that she's enjoying it. Nothing to argue with." } },
    { id: "f03", concept: "playfulness", her: "For the record, I never text first.",
      fill: { before: "Neither do I. One of us is", after: ".", answers: ["lying", "bluffing", "wrong"],
        hint: "one word — call it", ideal: "lying",
        note: "You caught the contradiction without accusing her of anything." } },
    { id: "f04", concept: "angle", her: "Go on then. Impress me.",
      fill: { before: "No.", after: " me.", answers: ["impress", "you"], hint: "one word — hand it back", ideal: "impress",
        note: "You refused the audition and made her audition instead." } }
  ];

  // Her mood when a run ends, by how it ended and how far you got.
  var GONE = {
    slow: ["She's put her phone down.", "You took too long. She's talking to someone else now.",
      "Six seconds. That's all it was.", "Dead air. She's gone."],
    cold: ["She's gone cold.", "\u201cAnyway\u201d, she says. That's the end of it.",
      "She stopped asking questions three replies ago.", "Left on read, and fairly."],
    end: ["She's still typing. That's the whole point.", "You held it. She's the one chasing now.",
      "That was genuinely good. She's rearranging her Thursday."]
  };

  function shuffled(a) {
    var out = a.slice();
    for (var i = out.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = out[i]; out[i] = out[j]; out[j] = t; }
    return out;
  }
  // A run escalates: picks, then picks against a shorter clock, then typing.
  // Fills are held back so the first exchanges are always winnable.
  function run(length) {
    var n = Math.max(4, length || 9);
    var picks = shuffled(LINES.filter(function (l) { return !l.fill; }));
    var fills = shuffled(LINES.filter(function (l) { return !!l.fill; }));
    var out = picks.slice(0, n);
    if (n >= 7 && fills.length) {
      out[6] = fills[0];
      if (n >= 9 && fills[1]) out[8] = fills[1];
    }
    return out.slice(0, n);
  }
  function levelAt(i) { return i < 3 ? 1 : i < 6 ? 2 : 3; }
  function gone(kind) { var a = GONE[kind] || GONE.cold; return a[Math.floor(Math.random() * a.length)]; }
  function accepts(fill, typed) {
    var t = String(typed || "").toLowerCase().replace(/[^a-z\- ]/g, "").trim();
    if (!t) return false;
    return (fill.answers || []).some(function (a) { return a.toLowerCase() === t; });
  }
  return { run: run, levelAt: levelAt, gone: gone, accepts: accepts, all: LINES, count: LINES.length };
})();
