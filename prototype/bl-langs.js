// BuddyLingo language registry — the ONE place a language is described.
// Before this file, adding a language meant ~25 hand edits across nine files
// (ten hardcoded tables in Vocab Map alone). Now: one row here, one deck file,
// one page, the art. Everything else reads from this.
//
// Mirrors the `languages` table (id, name, colour, active, deck_size). hydrate()
// refreshes name/colour/active/deckSize from the server when it is reachable, so
// a language can be switched on without a push.
window.BLLangs = (function () {
  const A = "assets/chars/";
  // id · code · display names · colour · page · deck file · save key · art
  //   hero: the language's own character, the one its page opens with — every
  //   surface (splash, header, done screen, the map) shows the SAME drawing.
  //   cast: the three singles its page lines up under the hero; they fight at
  //   the front line on the map, in that order.
  //   facesRight: front-on art is never mirrored; kept for art that ever is.
  //   kind: "country" (a real language, holds ground on the map) or "skill" (a
  //     trainer that publishes real counts and ranks alongside them, but does not
  //     hold territory — there is no country to colour in).
  //   unit: what one point of `known` IS. Countries count words; the skills count
  //     scenarios. Every surface reads this instead of hardcoding "words".
  const LANGS = [
    { id: "fr", code: "FR", country: "France", name: "Français", native: "Le Français", article: "La France",
      color: "#d62828", page: "Vocab French.dc.html", deck: "deck.js", save: "vocab-fr-v1",
      hero: A + "croissant.png", duo: null, cheer: null, facesRight: false,
      cast: ["fromage", "baguette", "brie"], deckSize: 1059, active: true, sort: 10 },
    { id: "el", code: "EL", country: "Greece", name: "Ελληνικά", native: "Τα Ελληνικά", article: "La Grèce",
      color: "#2160a8", page: "Vocab Greek.dc.html", deck: "greek-deck.js", save: "vocab-el-v1",
      hero: A + "olive.png", duo: null, cheer: null, facesRight: false,
      cast: ["feta", "citron", "tzatziki"], deckSize: 967, active: true, sort: 20 },
    { id: "de", code: "DE", country: "Germany", name: "Deutsch", native: "Deutsch", article: "L’Allemagne",
      color: "#8a6a1f", page: "Vocab German.dc.html", deck: "deck-de.js", save: "vocab-de-v1",
      hero: A + "brezel.png", duo: null, cheer: null, facesRight: false,
      cast: ["brezel", "wurst", "kartoffel"], deckSize: 1000, active: true, sort: 30 },
    { id: "es", code: "ES", country: "Spain", name: "Español", native: "El Español", article: "L’Espagne",
      color: "#c2571d", page: "Vocab Spanish.dc.html", deck: "deck-es.js", save: "vocab-es-v1",
      hero: A + "paella.png", duo: null, cheer: null, facesRight: false,
      cast: ["churro", "jamon", "paella"], deckSize: 1000, active: false, sort: 40 },
    { id: "tn", code: "TN", country: "Tunisia", name: "Tounsi", native: "Tounsi", article: "La Tunisie",
      color: "#2a8c46", page: "Vocab Tunisian.dc.html", deck: "deck-tn.js", save: "vocab-tn-v1",
      hero: A + "harissa.png", duo: null, cheer: null, facesRight: false,
      cast: ["couscous", "brik", "harissa"], deckSize: 1000, active: false, sort: 50 },
    // Lover Language is a selectable language in its own right: it has a deck, a
    // page, a save key, real published counts and a place in the switcher. It is
    // kind:"skill", so it ranks with the others without claiming a country.
    { id: "ll", code: "LL", country: null, name: "Lover Language", native: "Lover Language", article: "Lover Language",
      color: "#6d4aa8", page: "Vocab Lover.dc.html", deck: "court-deck.js", save: "vocab-ll-v1",
      hero: A + "heart-shades.png", duo: null, cheer: A + "cheer-ll.png", facesRight: false,
      cast: ["heart-specs", "heart-bow", "heart-cap"], deckSize: 32, active: true, sort: 60,
      kind: "skill", unit: "scenarios" },
    { id: "wa", code: "WA", country: null, name: "Words of Affirmation", native: "Words of Affirmation", article: "Words of Affirmation",
      color: "#9c6d3f", page: "Vocab Affirmation.dc.html", deck: "court-deck.js", save: "vocab-wa-v1",
      hero: A + "heart-band.png", duo: null, cheer: A + "cheer-wa.png", facesRight: false,
      cast: ["heart-mini", "heart-bow", "heart-cap"], deckSize: 11, active: true, sort: 70,
      kind: "skill", unit: "scenarios" }
  ];
  // art that is much thinner or fatter than the rest, so the scrum reads evenly
  const SCALE = { "heart-specs": 1, "heart-bow": 1, "heart-cap": 1, "heart-mini": 0.9,
    baguette: 1.5, wurst: 1.32, olive: 0.92, brezel: 1.1, kartoffel: 1.05,
    dolma: 1.08, churro: 1.15, paella: 0.95, harissa: 0.95, couscous: 1, brik: 1.05,
    brie: 0.88, citron: 0.95, tzatziki: 0.95, jamon: 1.05, fromage: 1, croissant: 1, feta: 1 };

  const byId = {};
  function index() { LANGS.forEach(function (l) { byId[l.id] = l; }); }
  index();
  function get(id) { return byId[id] || null; }
  // Countries hold ground on the map; skills rank beside them without territory.
  function kindOf(id) { const l = get(id); return (l && l.kind) || "country"; }
  function isSkill(id) { return kindOf(id) === "skill"; }
  function unitOf(id) { const l = get(id); return (l && l.unit) || "words"; }
  function countries() { return active().filter(function (l) { return kindOf(l.id) === "country"; }); }
  function skills() { return active().filter(function (l) { return kindOf(l.id) === "skill"; }); }
  function all() { return LANGS.slice().sort(function (a, b) { return a.sort - b.sort; }); }
  function active() { return all().filter(function (l) { return l.active; }); }
  function ids() { return all().map(function (l) { return l.id; }); }
  // { fr: <field>, el: <field>, … } — drop-in replacement for the old hardcoded
  // COLOR / LANGNAME / CODE / CAST tables.
  function map(field, fallback) {
    const o = {};
    LANGS.forEach(function (l) { o[l.id] = l[field] == null ? fallback : l[field]; });
    return o;
  }
  function label(id, field) { const l = get(id); return l ? l[field] : id; }
  // a language's mascot art with a guaranteed fallback, so a language with no
  // duo/cheer drawn yet still renders something of its own
  function art(id, kind) {
    const l = get(id);
    if (!l) return A + "croissant.png";
    // kind is a hint (duo / cheer). Falls through to the language's hero so the
    // map never invents art the rest of the app does not use.
    return l[kind] || l.hero || (A + (l.cast && l.cast[0] ? l.cast[0] : "croissant") + ".png");
  }
  function cast(id) { const l = get(id); return (l && l.cast) || ["croissant", "fromage", "baguette"]; }
  function scale(mascot) { return SCALE[mascot] || 1; }
  function pageOf(id) { return label(id, "page"); }
  function saveKey(id, slotSuffix) { return label(id, "save") + (slotSuffix || ""); }
  // Server refresh: name, colour, active and deck size come from the languages
  // table when it is reachable. Everything art-shaped stays local (the files
  // have to exist in the build anyway). Fails soft — offline keeps the defaults.
  function hydrate(done) {
    const cfg = window.BL_CONFIG || {};
    if (!cfg.url || !cfg.anonKey || String(cfg.url).indexOf("YOUR-") > -1) { if (done) done(false); return; }
    const url = String(cfg.url).replace(/\/+$/, "") + "/rest/v1/languages?select=id,name,color,active,deck_size,native_name,code,sort";
    fetch(url, { headers: { apikey: cfg.anonKey, Authorization: "Bearer " + cfg.anonKey } })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (rows) {
        if (!rows || !rows.length) { if (done) done(false); return; }
        rows.forEach(function (r) {
          const l = byId[r.id];
          if (!l) return; // a language the server knows and this build has no art for
          if (r.name) l.name = r.name;
          if (r.native_name) l.native = r.native_name;
          if (r.code) l.code = r.code;
          if (r.color) l.color = r.color;
          if (r.deck_size) l.deckSize = r.deck_size;
          if (r.sort != null) l.sort = r.sort;
          l.active = r.active !== false;
        });
        if (done) done(true);
      })
      .catch(function () { if (done) done(false); });
  }
  return { all: all, active: active, ids: ids, get: get, map: map, label: label,
    art: art, cast: cast, scale: scale, pageOf: pageOf, saveKey: saveKey,
    kindOf: kindOf, isSkill: isSkill, unitOf: unitOf, countries: countries, skills: skills,
    hydrate: hydrate, SCALE: SCALE };
})();
