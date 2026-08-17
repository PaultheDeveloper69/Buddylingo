// BuddyLingo front logic — pure functions, no DOM, no network.
// Two frames, always both available:
//   individual  you vs one other fighter (same language or not) — raw words
//   faction     your language vs another language — sum of its fighters (numbers SHOULD count)
// Plus: ladder (everyone ranked), co-op (your language's fighters added together),
// and the rival system (nemesis, feuds, who is gunning for you).
//
// Score = force (raw words known) + bonus (nuance points, 0 until we define sources).
// Deck sizes deliberately do NOT normalise anything: what matters is how many words
// you know, not how many exist.
window.BLFront = (function () {
  const B64 = typeof btoa === "function";

  // ---- per-word masks ------------------------------------------------------
  // A fighter's known words as a bitmask over the deck's index order. 1,059 words
  // = 133 bytes. Deck order is append-only, so bit i always means the same word.
  function maskFromCards(cards, deck) {
    const n = deck.length, bytes = new Uint8Array(Math.ceil(n / 8));
    for (let i = 0; i < n; i++) {
      const c = cards[deck[i][0]];
      if (c && !c.lapsed) bytes[i >> 3] |= (1 << (i & 7));
    }
    if (!B64) return null;
    let s = "";
    for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
    return btoa(s);
  }
  function maskBytes(b64) {
    if (!b64 || !B64) return null;
    try {
      const s = atob(b64), a = new Uint8Array(s.length);
      for (let i = 0; i < s.length; i++) a[i] = s.charCodeAt(i);
      return a;
    } catch (e) { return null; }
  }
  const POP = (function () { const t = new Uint8Array(256); for (let i = 0; i < 256; i++) t[i] = (i & 1) + t[i >> 1]; return t; })();
  function countBits(a) { let n = 0; for (let i = 0; i < a.length; i++) n += POP[a[i]]; return n; }
  function maskCount(b64) { const a = maskBytes(b64); return a ? countBits(a) : 0; }
  function combine(masks, op) {
    const list = (masks || []).map(maskBytes).filter(Boolean);
    if (!list.length) return null;
    const len = list.reduce(function (m, a) { return Math.max(m, a.length); }, 0);
    const out = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      let v = op === "and" ? 0xff : 0;
      for (let j = 0; j < list.length; j++) {
        const b = list[j][i] || 0;
        v = op === "and" ? (v & b) : (v | b);
      }
      out[i] = v;
    }
    return out;
  }
  function unionCount(masks) { const a = combine(masks, "or"); return a ? countBits(a) : 0; }
  function sharedCount(masks) { const a = combine(masks, "and"); return a ? countBits(a) : 0; }

  // ---- scoring ------------------------------------------------------------
  function force(f) { return Math.max(0, (f && f.known) || 0); }
  function bonus(f) { return Math.max(0, (f && f.bonus) || 0); }
  function score(f) { return force(f) + bonus(f); }
  function velocity(f) { return Math.max(0, (f && f.per_week) || 0); } // words in the last 7 days

  // ---- individual frame ---------------------------------------------------
  function duel(me, them) {
    if (!me || !them) return null;
    const a = score(me), b = score(them), sum = a + b;
    return {
      me: me, them: them, mine: a, theirs: b, gap: Math.abs(a - b),
      leader: a === b ? null : (a > b ? me.user_id : them.user_id),
      tie: a === b,
      minePct: sum > 0 ? Math.round(100 * a / sum) : 50,
      sameLanguage: me.language_id === them.language_id,
      // closing//pulling away, from weekly pace
      trend: velocity(me) === velocity(them) ? "level" : (velocity(me) > velocity(them) ? "gaining" : "losing")
    };
  }

  // ---- faction frame ------------------------------------------------------
  function factions(standings) {
    const by = {};
    (standings || []).forEach(function (f) {
      const k = f.language_id;
      if (!by[k]) by[k] = { language_id: k, words: 0, bonus: 0, fighters: [], mask: [] };
      by[k].words += force(f);
      by[k].bonus += bonus(f);
      by[k].fighters.push(f);
      if (f.known_mask) by[k].mask.push(f.known_mask);
    });
    const list = Object.keys(by).map(function (k) {
      const g = by[k];
      return {
        language_id: k, words: g.words, bonus: g.bonus, score: g.words + g.bonus,
        count: g.fighters.length, fighters: g.fighters,
        distinct: g.mask.length ? unionCount(g.mask) : null,   // words the faction holds at least once
        overlap: g.mask.length > 1 ? sharedCount(g.mask) : null // words every member knows
      };
    });
    list.sort(function (a, b) { return b.score - a.score; });
    list.forEach(function (g, i) { g.rank = i + 1; });
    return list;
  }
  function factionDuel(standings, langA, langB) {
    const f = factions(standings);
    const a = f.find(function (x) { return x.language_id === langA; }) || { language_id: langA, score: 0, words: 0, count: 0 };
    const b = f.find(function (x) { return x.language_id === langB; }) || { language_id: langB, score: 0, words: 0, count: 0 };
    const sum = a.score + b.score;
    return { a: a, b: b, aPct: sum > 0 ? Math.round(100 * a.score / sum) : 50, gap: Math.abs(a.score - b.score), tie: a.score === b.score };
  }

  // ---- ladder (scales to 1000: rank everyone, return a window) ------------
  function ladder(standings, meId, opts) {
    const o = opts || {};
    const rows = (standings || []).slice().sort(function (x, y) { return score(y) - score(x) || force(y) - force(x); });
    rows.forEach(function (f, i) { f = f; rows[i] = Object.assign({}, f, { rank: i + 1, score: score(f) }); });
    const top = rows.slice(0, o.top == null ? 3 : o.top);
    const mine = rows.findIndex(function (f) { return f.user_id === meId; });
    const span = o.around == null ? 2 : o.around;
    const near = mine < 0 ? [] : rows.slice(Math.max(0, mine - span), Math.min(rows.length, mine + span + 1));
    const seen = {};
    const view = top.concat(near).filter(function (f) { if (seen[f.user_id]) return false; seen[f.user_id] = 1; return true; });
    return { total: rows.length, me: mine < 0 ? null : rows[mine], top: top, near: near, view: view, all: rows };
  }

  // ---- co-op (teammates added together, per the brief) --------------------
  function coop(standings, lang) {
    const team = (standings || []).filter(function (f) { return f.language_id === lang; });
    const masks = team.map(function (f) { return f.known_mask; }).filter(Boolean);
    const total = team.reduce(function (n, f) { return n + score(f); }, 0);
    return {
      language_id: lang, members: team, count: team.length, total: total,
      distinct: masks.length ? unionCount(masks) : null,
      shared: masks.length > 1 ? sharedCount(masks) : null,
      // what each member alone contributes that nobody else on the team has
      soloOf: function (userId) {
        if (masks.length < 2) return null;
        const mine = team.find(function (f) { return f.user_id === userId; });
        if (!mine || !mine.known_mask) return null;
        const others = team.filter(function (f) { return f.user_id !== userId && f.known_mask; }).map(function (f) { return f.known_mask; });
        if (!others.length) return maskCount(mine.known_mask);
        const a = maskBytes(mine.known_mask), b = combine(others, "or");
        let n = 0;
        for (let i = 0; i < a.length; i++) n += POP[a[i] & ~(b[i] || 0)];
        return n;
      }
    };
  }

  // ---- rivals -------------------------------------------------------------
  // rivals: [{ user_id, rival_user_id }] — one pick each, public so "X is gunning
  // for you" is knowable. Mutual picks are a feud.
  function rivalView(standings, rivals, meId) {
    const byId = {};
    (standings || []).forEach(function (f) { byId[f.user_id] = f; });
    const mine = (rivals || []).find(function (r) { return r.user_id === meId; });
    const nemesis = mine ? byId[mine.rival_user_id] || null : null;
    const hunters = (rivals || [])
      .filter(function (r) { return r.rival_user_id === meId && r.user_id !== meId; })
      .map(function (r) { return byId[r.user_id]; })
      .filter(Boolean);
    const feud = !!(nemesis && hunters.some(function (h) { return h.user_id === nemesis.user_id; }));
    const me = byId[meId] || null;
    return {
      me: me, nemesis: nemesis, hunters: hunters, feud: feud,
      duel: me && nemesis ? duel(me, nemesis) : null,
      // the closest threat below you, whether or not they declared you
      chaser: (function () {
        if (!me) return null;
        const below = (standings || []).filter(function (f) { return f.user_id !== meId && score(f) < score(me); })
          .sort(function (a, b) { return score(b) - score(a); });
        return below[0] || null;
      })(),
      // suggest a rival: nearest score, prefer someone not already yours
      suggest: (function () {
        if (!me) return null;
        const others = (standings || []).filter(function (f) { return f.user_id !== meId; })
          .sort(function (a, b) { return Math.abs(score(a) - score(me)) - Math.abs(score(b) - score(me)); });
        return others[0] || null;
      })()
    };
  }

  // ---- the map: one lane per language ------------------------------------
  // Lane length is raw words. Markers sit at every `step` words; the contested
  // point is where the nearest other faction stands, so you can see who you are
  // about to pass. Works with 2 fighters and with 1000.
  function lanes(standings, opts) {
    const o = opts || {};
    const step = o.step || 250;
    const f = factions(standings);
    const max = Math.max(step, f.reduce(function (m, g) { return Math.max(m, g.score); }, 0));
    const ceiling = Math.ceil(max / step) * step;
    return {
      step: step, ceiling: ceiling,
      lanes: f.map(function (g) {
        const others = f.filter(function (x) { return x.language_id !== g.language_id; });
        const ahead = others.filter(function (x) { return x.score > g.score; }).sort(function (a, b) { return a.score - b.score; })[0] || null;
        const behind = others.filter(function (x) { return x.score < g.score; }).sort(function (a, b) { return b.score - a.score; })[0] || null;
        return {
          language_id: g.language_id, score: g.score, words: g.words, count: g.count, rank: g.rank,
          pct: Math.round(1000 * g.score / ceiling) / 10,
          distinct: g.distinct,
          contested: ahead ? { language_id: ahead.language_id, at: ahead.score, pct: Math.round(1000 * ahead.score / ceiling) / 10, gap: ahead.score - g.score } : null,
          chasing: behind ? { language_id: behind.language_id, at: behind.score, gap: g.score - behind.score } : null,
          // every fighter's position inside their own lane
          pins: g.fighters.map(function (x) {
            return { user_id: x.user_id, name: x.name, score: score(x), pct: Math.round(1000 * score(x) / ceiling) / 10 };
          }).sort(function (a, b) { return b.score - a.score; })
        };
      })
    };
  }

  return {
    maskFromCards: maskFromCards, maskCount: maskCount, unionCount: unionCount, sharedCount: sharedCount,
    score: score, force: force, bonus: bonus,
    duel: duel, factions: factions, factionDuel: factionDuel, ladder: ladder, coop: coop,
    rivalView: rivalView, lanes: lanes
  };
})();
