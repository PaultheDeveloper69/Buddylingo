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
    lead: "Sorry dear users — we've heard your criticism, and the team has been hard at work on version 2.5 to improve performance and fix what was broken.",
    items: [
      "Your progress now always follows your account. Log in on any device or browser and the words you know appear straight away — no waiting, no refreshing, no empty deck.",
      "Missed words are no longer a daily limit. A word you get wrong turns hot: inside a session it comes back after a growing gap of other cards, and it only cools once you have recalled it correctly on three different days. New words never stop arriving, however many you miss.",
      "Levels are rebuilt: A1 to C2 are gone, replaced by named ranks that each hold 100 words.",
      "Le Duel and The Front Line are now one section — the overall line big on top, the category breakdown below — and the faceoff is animated.",
      "New app icon."
    ],
    outro: "Keep an eye out for new features.",
    cta: "Let's go"
  };
  function withTitle(t) {
    var o = {}; for (var k in note) o[k] = note[k]; o.title = t; return o;
  }
  window.BL_RELEASE = {
    version: "2.5",
    auto: true,
    fr: withTitle("Le Français 2.5"),
    el: withTitle("Τα Ελληνικά 2.5"),
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
