// BuddyLingo release note — the "what's new" popup shown once after an update.
// Editing this file is the whole release ritual: bump `version`, rewrite the note, set auto:true.
//
//   auto:false  -> the popup never fires on its own; the sim-only toggle in the
//                  top-right corner of the vocab pages opens it for review.
//   auto:true   -> first login per fighter after the push shows it once, then
//                  stores the version under "bl-release-seen:<slot>" and stays quiet.
//
// Announcements are written in ENGLISH for every language. Only the headline
// carries the language's own name.
(function () {
  var note = {
    kicker: "What's new",
    lead: "Version 2.8 — the expansion. German is live, two slots are open for new fighters, and the whole language war now has a map.",
    items: [
      "Deutsch is a real front: it publishes, restores on a new phone, and holds territory like French and Greek.",
      "The Vocab Map folds out from the duel: every language on one road to one crown, ranked, with the duel one tap away.",
      "Declare war on as many fighters as you like — one war each. Tap any fighter to declare, tap again to withdraw.",
      "Two open slots on the login grid. Bring a friend; they pick a language and join the board immediately.",
      "Your own progress is safe: nothing about your words, streak or decorations changed in this update."
    ],
    outro: "Keep an eye out for new features.",
    cta: "Let's go"
  };
  function withTitle(t) {
    var o = {}; for (var k in note) o[k] = note[k]; o.title = t; return o;
  }
  window.BL_RELEASE = {
    version: "2.8",
    auto: true,
    fr: withTitle("Le Français 2.8"),
    el: withTitle("Τα Ελληνικά 2.8"),
    de: withTitle("Deutsch 2.8"),
    es: withTitle("El Español 2.8"),
    tn: withTitle("Tounsi 2.8"),
    // The sim-only toggle stays out of the live app.
    devToggle: (function () {
      try {
        var h = (location.hostname || "").toLowerCase();
        return !(h.indexOf("buddylingo") >= 0 || h.indexOf("github.io") >= 0);
      } catch (e) { return false; }
    })(),
    key: function (slot) { return "bl-release-seen:" + (slot == null ? "guest" : slot); },
    unseen: function (slot) {
      if (!this.auto) return false;
      try { return localStorage.getItem(this.key(slot)) !== this.version; } catch (e) { return false; }
    },
    markSeen: function (slot) {
      try { localStorage.setItem(this.key(slot), this.version); } catch (e) {}
    }
  };
})();
