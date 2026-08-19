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
      cast: ["couscous", "brik", "harissa"], deckSize: 1000, active: false, sort: 50 }
  ];
  // art that is much thinner or fatter than the rest, so the scrum reads evenly
  const SCALE = { baguette: 1.5, wurst: 1.32, olive: 0.92, brezel: 1.1, kartoffel: 1.05,
    dolma: 1.08, churro: 1.15, paella: 0.95, harissa: 0.95, couscous: 1, brik: 1.05,
    brie: 0.88, citron: 0.95, tzatziki: 0.95, jamon: 1.05, fromage: 1, croissant: 1, feta: 1 };

  const byId = {};
  function index() { LANGS.forEach(function (l) { byId[l.id] = l; }); }
  index();
  function get(id) { return byId[id] || null; }
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
    hydrate: hydrate, SCALE: SCALE };
})();
