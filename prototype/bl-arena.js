// BuddyLingo arena helpers — who else is fighting, and who you have declared on.
// The language pages each carry their own study engine, so this file holds only
// the shared arena logic: read every fighter's published numbers, and keep the
// set of wars this fighter has declared (one per opponent, never two).
//
// Wars live in localStorage under bl-wars:<lang><slot> and are published to
// Supabase when the device is signed in (rivals + challenges from schema-v8).
window.BLArena = (function () {
  function suffix() {
    try { const s = JSON.parse(localStorage.getItem("bl-session") || "null"); return s && s.slot != null ? ":" + s.slot : ""; }
    catch (e) { return ""; }
  }
  function key(lang) { return "bl-wars:" + lang + suffix(); }
  function wars(lang) { try { return JSON.parse(localStorage.getItem(key(lang)) || "{}") || {}; } catch (e) { return {}; } }
  function save(lang, w) { try { localStorage.setItem(key(lang), JSON.stringify(w)); } catch (e) {} }
  function cached() { try { return JSON.parse(localStorage.getItem("bl-arena") || "null"); } catch (e) { return null; } }

  // Cached numbers paint immediately; the network only refines them. Bots are
  // filtered by their flag (name matching used to hide real fighters).
  function pull(lang, cb) {
    const c = cached();
    if (c && cb) cb(c);
    if (!(window.BLSync && window.BLSync.enabled)) return;
    Promise.all([window.BLSync.whoAmI(), window.BLSync.standings(), window.BLSync.rivals()]).then(function (r) {
      const rows = r[1];
      if (!rows || !rows.length) return;
      const real = rows.filter(function (x) {
        if (x.is_bot === true || (x.is_bot == null && /^test/i.test(x.name || ""))) return false;
        // a language opened but never studied published known=0: not a fighter here
        return (x.known || 0) > 0 || x.is_primary !== false;
      });
      const a = { me: r[0] || null, rows: real, rivals: r[2] || [], at: Date.now() };
      try { localStorage.setItem("bl-arena", JSON.stringify(a)); } catch (e) {}
      if (cb) cb(a);
    });
  }

  // One entry per fighter per language (a person studying two holds two lines),
  // ranked by score, with your own row and your declared wars marked.
  function fighters(lang, arena) {
    const a = arena || cached();
    if (!a || !a.rows) return [];
    const w = wars(lang);
    return a.rows.map(function (x) {
      const id = x.user_id + "|" + x.language_id;
      return {
        id: id, user_id: x.user_id, name: x.name, language_id: x.language_id,
        score: x.known || 0, missionPts: x.bonus || 0,
        mine: !!(a.me && x.user_id === a.me),
        atWar: !!w[id],
        hunting: (a.rivals || []).some(function (r) { return a.me && r.rival_user_id === a.me && r.user_id === x.user_id; })
      };
    }).sort(function (p, q) { return q.score - p.score; });
  }

  // Declaring is additive: you can be at war with everyone at once, but only
  // once per person. Publishing fails soft — the local declaration still stands.
  function declare(lang, f, term, bases) {
    if (!f) return { error: "no fighter" };
    const w = wars(lang);
    if (w[f.id]) return { already: true };
    w[f.id] = { at: Date.now(), term: term || 7, name: f.name, lang: f.language_id, user_id: f.user_id };
    save(lang, w);
    if (window.BLSync && window.BLSync.setRival) window.BLSync.setRival(f.user_id, lang);
    if (window.BLSync && window.BLSync.startChallenge) {
      window.BLSync.startChallenge({ target: f.user_id, language_id: lang, term_days: term || 7,
        base_challenger: (bases && bases.mine) || 0, base_target: (bases && bases.theirs) || 0 });
    }
    return { ok: true };
  }
  // A fighter who picked a nemesis before wars existed keeps it: the old
  // bl-rival pick becomes their first declared war, once, silently.
  function adopt(lang, userId, rows) {
    if (!userId || warCount(lang) > 0) return;
    const row = (rows || []).filter(function (x) { return x.user_id === userId; })[0];
    if (!row) return;
    const w = wars(lang);
    w[row.user_id + "|" + row.language_id] = { at: Date.now(), term: 7, name: row.name,
      lang: row.language_id, user_id: row.user_id, adopted: true };
    save(lang, w);
  }
  function withdraw(lang, f) { const w = wars(lang); if (f) delete w[f.id]; save(lang, w); return { ok: true }; }
  function warCount(lang) { return Object.keys(wars(lang)).length; }
  function warNames(lang) { const w = wars(lang); return Object.keys(w).map(function (k) { return w[k].name; }); }

  return { pull: pull, cached: cached, fighters: fighters, declare: declare, adopt: adopt,
    withdraw: withdraw, wars: wars, warCount: warCount, warNames: warNames };
})();
