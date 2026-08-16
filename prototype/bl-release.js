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
    lead: "Dear fighters — our team has been hard at work on version 2.4.1, which comes with the following updates.",
    items: [
      "The French deck grows to 1,059 words and the Greek deck to 967 — over 1,000 new entries from B1 to C1: society, work, media, health, environment and idiom.",
      "Levels now hold 200 words instead of 100, so A1 through C1 each take real work to clear.",
      "216 Greek words switch to their Cypriot form when you flip the dialect toggle — it was 39 before.",
      "Your progress is untouched. Every word you have already learned keeps its box, its review date and your streak.",
      "Performance updates: the fighter grid and your rival's score now load in one fast request and paint from the last known values, so fighters and battle numbers appear straight away instead of after a refresh."
    ],
    outro: "Keep an eye out for new features.",
    cta: "Let's go"
  };
  function withTitle(t) {
    var o = {}; for (var k in note) o[k] = note[k]; o.title = t; return o;
  }
  window.BL_RELEASE = {
    version: "2.4.1",
    auto: true,
    fr: withTitle("Le Français 2.4.1"),
    el: withTitle("Τα Ελληνικά 2.4.1"),
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
