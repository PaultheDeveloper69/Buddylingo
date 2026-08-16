// Vocab War — pure, deterministic rules. No DOM, no storage, no side effects.
// Everything takes plain data + cfg and returns plain data, so it can be unit-tested
// and later ported verbatim to a Postgres function (server-authoritative).
(function () {
  function masteryOfCard(card, cfg) {
    if (!card) return cfg.unseenMastery;
    if (card.lapsed) return cfg.lapsedMastery;
    const b = Math.max(0, Math.min(cfg.masteryByBox.length - 1, card.box || 0));
    return cfg.masteryByBox[b];
  }
  // fighter: { lang, cards: {deckKey: cardState}, reps }
  function fighterEligible(fighter, cfg) {
    return (fighter.reps || 0) >= cfg.minCardsForEligibility;
  }
  function tileMissing(tile, content, langIds) {
    const out = {};
    for (const lang of langIds) {
      const miss = tile.concepts.filter(function (cid) { return !content.concepts[cid].keys[lang]; });
      if (miss.length) out[lang] = miss;
    }
    return out;
  }
  function tileActive(tile, content, langIds) {
    return Object.keys(tileMissing(tile, content, langIds)).length === 0;
  }
  // fixed denominator: ALWAYS tile.concepts.length
  function playerTileStrength(fighter, tile, content, cfg) {
    let sum = 0;
    const per = tile.concepts.map(function (cid) {
      const key = content.concepts[cid].keys[fighter.lang];
      const m = key ? masteryOfCard(fighter.cards[key], cfg) : 0;
      sum += m;
      return { id: cid, label: content.concepts[cid].label, mastery: m, seen: !!(key && fighter.cards[key]) };
    });
    return { pct: tile.concepts.length ? sum / tile.concepts.length : 0, per: per };
  }
  // average over ELIGIBLE enlisted fighters only; team size adds no power
  function factionTileStrength(fighters, faction, tile, content, cfg) {
    const active = fighters.filter(function (f) { return f.lang === faction && fighterEligible(f, cfg); });
    if (!active.length) return 0;
    let sum = 0;
    for (const f of active) sum += playerTileStrength(f, tile, content, cfg).pct;
    return sum / active.length;
  }
  // deterministic ownership with claim threshold + hysteresis.
  // strengths: {langId: pct}. prevOwner: langId|null. Returns {owner, contested, top, second}
  function resolveOwnership(prevOwner, strengths, cfg, factionOrder, allowed) {
    const can = function (id) { return !allowed || allowed.indexOf(id) !== -1; };
    const order = factionOrder || Object.keys(strengths).sort();
    let top = null, second = null;
    for (const id of order) {
      const s = strengths[id] || 0;
      if (!top || s > strengths[top]) { second = top; top = id; }
      else if (!second || s > strengths[second]) { second = id; }
    }
    const topS = top ? (strengths[top] || 0) : 0;
    const secondS = second ? (strengths[second] || 0) : 0;
    let owner = prevOwner || null;
    if (owner && (strengths[owner] || 0) < cfg.claimThreshold) owner = null; // owner decayed below claim line
    if (!owner) {
      // claim by the strongest faction WITH A BORDER here (front-line rule); ties resolve by faction order
      let claimant = null;
      for (const id of order) { const sv = strengths[id] || 0; if (can(id) && sv >= cfg.claimThreshold && (!claimant || sv > (strengths[claimant] || 0))) claimant = id; }
      owner = claimant;
    } else if (top !== owner && can(top) && topS > (strengths[owner] || 0) + cfg.decisiveMargin) {
      owner = top; // decisive capture across the border
    }
    const rivalS = owner === top ? secondS : topS;
    const contested = !!owner && (rivalS >= (strengths[owner] || 0) - cfg.contestBand) && rivalS > 0 && (owner !== top || second !== null);
    return { owner: owner, contested: contested && !!owner, top: top, second: second };
  }
  window.WAR_RULES = {
    masteryOfCard: masteryOfCard,
    fighterEligible: fighterEligible,
    tileMissing: tileMissing,
    tileActive: tileActive,
    playerTileStrength: playerTileStrength,
    factionTileStrength: factionTileStrength,
    resolveOwnership: resolveOwnership
  };
})();
