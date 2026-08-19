// One publish/restore path for every language page.
// French and Greek each grew their own ~40-line copy of this; German, Spanish
// and Tunisian had none at all, which is why their fighters never appeared on
// the ladder, the front or the map. New languages get it for two lines.
//
//   BLPageSync.publish(lang, cards, deck, extra)   after every save
//   BLPageSync.restore(lang, deck, apply)          once on mount
//
// Fails soft everywhere: no config, no network, no session => the page stays
// local and nothing throws. Publishing is still gated to the live domain by
// bl-sync (a preview copy can read the arena but never write a score).
window.BLPageSync = (function () {
  const DAY = 86400000;
  const timers = {};
  function on() { return !!(window.BLSync && window.BLSync.enabled); }

  // words known per category, over the deck's own index order
  function catCount(cards, deck) {
    const cat = { B: 0, N: 0, V: 0, A: 0, total: 0 };
    for (let i = 0; i < (deck || []).length; i++) {
      const c = cards[deck[i][0]];
      if (c && !c.lapsed) { const k = deck[i][3]; cat[k] = (cat[k] || 0) + 1; cat.total++; }
    }
    return cat;
  }
  function weapons(badges) {
    return Object.keys(badges || {}).filter(function (k) { return k.slice(0, 2) === "w_"; }).length;
  }

  // Debounced per language: a burst of answers publishes once.
  // extra: { xp, stats, badges, days, tierFloor, bonus }
  function publish(lang, cards, deck, extra, done) {
    if (!on()) return;
    const e = extra || {};
    clearTimeout(timers[lang]);
    timers[lang] = setTimeout(function () {
      const cat = catCount(cards, deck);
      // nothing learned yet: publishing a known=0 row would enrol this fighter
      // into a language they have only opened
      if (!cat.total) return;
      const mask = window.BLFront ? window.BLFront.maskFromCards(cards, deck || []) : null;
      const bonus = e.bonus != null ? e.bonus : 25 * weapons(e.badges);
      // MASTER: the word-exact record (private, upserted, rev-guarded)
      if (window.BLSync.pushState) {
        window.BLSync.pushState(lang, { cards: cards, known: cat.total, mask: mask, catKnown: cat,
          xp: e.xp || 0, stats: e.stats || {}, badges: e.badges || {}, days: e.days || {},
          tierFloor: e.tierFloor || 0 });
      }
      // SUB: the public derived counts the ladder, duel and map read
      window.BLSync.pushSnapshot(lang, cat.total, cat, { mask: mask, bonus: bonus }).then(function (r) {
        if (r && r.ok) { try { localStorage.setItem("bl-pub:" + lang, String(Date.now())); } catch (x) {} }
        if (done) done(r);
      });
    }, 1500);
  }

  // Fresh device with an empty deck: rebuild from the server. Master first
  // (word-exact, with boxes, due dates and hot state), snapshot as fallback.
  // apply() receives a merge payload and decides — local progress always wins.
  function restore(lang, deck, apply) {
    if (!on() || typeof apply !== "function") return;
    function counts() {
      if (!window.BLSync.myFront) return;
      window.BLSync.myFront(lang).then(function (r) {
        if (!r) return;
        let b = null;
        try { if (r.known_mask) b = atob(r.known_mask); } catch (x) {}
        const cards = {}, due = Date.now() + 7 * DAY;
        let n = 0;
        for (let i = 0; i < (deck || []).length; i++) {
          // pre-mask snapshots: fall back to the first `known` words in deck
          // order, so at least the count survives the move to a new phone
          const bit = b ? (b.charCodeAt(i >> 3) & (1 << (i & 7))) : i < (r.known || 0);
          if (bit) { cards[deck[i][0]] = { box: 3, reps: 3, misses: 0, due: due }; n++; }
        }
        if (n) apply({ cards: cards });
      });
    }
    if (window.BLSync.pullState) {
      window.BLSync.pullState(lang).then(function (m) {
        if (m && m.cards && Object.keys(m.cards).length) {
          apply({ cards: m.cards, stats: m.stats, days: m.days, badges: m.badges,
            xp: m.xp, tierFloor: m.tier_floor });
          return;
        }
        counts();
      });
      return;
    }
    counts();
  }

  // when this device last managed to publish this language
  function publishedAt(lang) {
    try { return Number(localStorage.getItem("bl-pub:" + lang)) || 0; } catch (e) { return 0; }
  }
  return { publish: publish, restore: restore, catCount: catCount, weapons: weapons, publishedAt: publishedAt };
})();
