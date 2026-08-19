// BuddyLingo sync layer — talks to Supabase. Accounts are claim-once:
// credentials derive from slot+name+PIN, verified server-side (never in the page).
// All calls fail soft: no server, no config, no network => app stays local.
window.BLSync = (function () {
  const cfg = window.BL_CONFIG || {};
  const ok = !!(cfg.url && cfg.anonKey && String(cfg.url).indexOf("YOUR-") === -1 && String(cfg.anonKey).indexOf("YOUR-") === -1);
  // Publishing is gated to the real deployment: a design preview or local copy
  // with a logged-in session must never overwrite the live score (it happened:
  // a stale save rolled fr back from 125 to 57 on 2026-08-17). Reads stay open
  // everywhere; cfg.pushAnywhere = true overrides for testing.
  const canPush = !!cfg.pushAnywhere || (function () {
    try { return /(^|\.)buddylingo\.de$/i.test(location.hostname); } catch (e) { return false; }
  })();
  let client = null;
  const REST = ok ? String(cfg.url).replace(/\/+$/, "") + "/rest/v1/" : null;
  // Public reads (roster, front snapshots) go straight to REST: one request, no
  // waiting for the CDN bundle. The SDK is only needed for password auth.
  async function restGet(q) {
    if (!REST) return null;
    const ctl = typeof AbortController !== "undefined" ? new AbortController() : null;
    const t = ctl ? setTimeout(function () { ctl.abort(); }, 6000) : null;
    try {
      const r = await fetch(REST + q, {
        headers: { apikey: cfg.anonKey, Authorization: "Bearer " + cfg.anonKey, Accept: "application/json" },
        signal: ctl ? ctl.signal : undefined
      });
      if (t) clearTimeout(t);
      if (!r.ok) return null;
      const j = await r.json();
      return Array.isArray(j) ? j : null;
    } catch (e) { if (t) clearTimeout(t); return null; }
  }
  function c() {
    if (!client && ok && window.supabase) {
      try { client = window.supabase.createClient(cfg.url, cfg.anonKey); } catch (e) {}
    }
    return client;
  }
  // The Supabase bundle loads from a CDN, so the first call can land before the
  // client exists. Every entry point waits for it instead of failing silently.
  function ready(ms) {
    const limit = ms || 6000, t0 = Date.now();
    return new Promise(function (res) {
      (function tick() {
        if (c()) return res(true);
        if (!ok || Date.now() - t0 > limit) return res(false);
        setTimeout(tick, 200);
      })();
    });
  }
  // null means "ask again"; false means "asked, nothing there".
  async function retry(fn, tries) {
    const n = tries || 3;
    for (let i = 0; i < n; i++) {
      const v = await fn();
      if (v != null) return v;
      if (i < n - 1) await new Promise(function (r) { setTimeout(r, 400 * Math.pow(2, i)); });
    }
    return null;
  }
  function slug(name) { return String(name).toLowerCase().normalize("NFD").replace(/[^a-z0-9]/g, "").slice(0, 20) || "fighter"; }
  function email(slot, name) { return "f" + slot + "." + slug(name) + "@buddylingo.app"; }
  function pass(pin, name) { return "bl-" + pin + "-" + slug(name); }
  // The user id is cached at login so data pulls never wait for the auth SDK
  // (a CDN bundle) — one localStorage read instead of up to 6s of polling.
  function cacheUid(slot, name, id) { try { localStorage.setItem("bl-uid:" + email(slot, name), id); } catch (e) {} }
  function cachedUid() {
    try {
      const s = JSON.parse(localStorage.getItem("bl-session") || "null");
      return s ? localStorage.getItem("bl-uid:" + email(s.slot, s.name)) : null;
    } catch (e) { return null; }
  }
  async function login(slot, name, pin) {
    if (!(await ready())) return { offline: true };
    try {
      try { await client.auth.signOut(); } catch (e) {} // clear any stale/foreign session first
      const r = await client.auth.signInWithPassword({ email: email(slot, name), password: pass(pin, name) });
      if (!r.error && r.data && r.data.user) cacheUid(slot, name, r.data.user.id);
      return r.error ? { error: r.error.message } : { ok: true };
    } catch (e) { return { offline: true }; }
  }
  // Slots are no longer capped at ten (v8 dropped the 0..9 check): slot is just
  // the public ordinal on the login grid, so registration keeps going.
  const MAX_SLOTS = cfg.maxSlots || 200;
  function firstFree(rows) {
    const by = {}; (rows || []).forEach(function (f) { by[f.slot] = f; });
    for (let i = 0; i < MAX_SLOTS; i++) if (!by[i]) return i;
    return null;
  }
  async function register(slot, name, lang, pin) {
    // Enlisting is gated to the real deployment, exactly like publishing. A slot
    // claimed from a preview or a local copy creates a real auth user and a real
    // fighters row that nobody can free again (unique slot + owner-only RLS) —
    // and claimable slots are deliberately scarce. cfg.pushAnywhere overrides.
    if (!canPush) return { blocked: true };
    if (!(await ready())) return { offline: true };
    try {
      // slot already claimed by someone else? tell the client to slide over
      const rows = (await roster()) || [];
      const holder = rows.find(function (f) { return f.slot === slot; });
      if (holder && slug(holder.name) !== slug(name)) return { slotTaken: true, next: firstFree(rows) };
      const r = await client.auth.signUp({ email: email(slot, name), password: pass(pin, name) });
      if (r.error) { const li = await login(slot, name, pin); li.slot = slot; return li; }
      const uid = r.data && r.data.user ? r.data.user.id : null;
      if (uid) {
        cacheUid(slot, name, uid);
        // the language they enlist with IS their primary one — without this the
        // column keeps its default (false) and the new fighter reads as a
        // secondary side of themselves everywhere downstream
        enrolLanguage(lang, uid, true);
        const ins = await client.from("fighters").insert({ user_id: uid, slot: slot, name: name, language_id: lang });
        if (ins.error) { // lost a simultaneous race: DB unique index protected the slot
          const fresh = (await roster()) || [];
          return { slotTaken: true, next: firstFree(fresh) };
        }
      }
      return { ok: true, slot: slot };
    } catch (e) { return { offline: true }; }
  }
  async function roster() {
    const fast = await retry(function () { return restGet("fighters?select=slot,name,language_id"); }, 2);
    if (fast) return fast;
    if (!(await ready())) return null;
    const rows = await retry(async function () {
      try {
        const r = await client.from("fighters").select("slot,name,language_id");
        if (r.error) return null;
        return r.data || [];
      } catch (e) { return null; }
    }, 4);
    return rows || null;
  }
  async function pushSnapshot(lang, known, catKnown, extra) {
    try {
      if (!canPush) return { blocked: true };
      if (!(await ready())) return { offline: true };
      const u = await client.auth.getUser();
      if (!u || !u.data || !u.data.user) return { error: "not signed in" };
      // split-brain guard: the auth session must BE the fighter this device logged
      // in as — otherwise pushes land on someone else's row (it happened: Paul's
      // phone published to Test User 1 for a whole afternoon).
      const cached = cachedUid();
      if (cached && u.data.user.id !== cached) {
        // Refuse the push — that alone protects the other fighter's row. We used to
        // sign the session out as well, which made this unrecoverable: the Supabase
        // session lives in localStorage and is SHARED by every tab, so a second tab
        // signed in as somebody else made both tabs sign each other out in a loop
        // and the "not reaching the server" warning never cleared. Report the real
        // cause instead and let the page retry once the right session is back.
        return { foreign: true, error: "another tab or device is signed in as a different fighter" };
      }
      const row = { user_id: u.data.user.id, language_id: lang, known: known, cat_known: catKnown || {} };
      // v4 columns — sent only when the caller has them, so a pre-v4 database
      // still accepts the insert.
      if (extra && extra.mask) row.known_mask = extra.mask;
      if (extra && extra.bonus != null) row.bonus = extra.bonus;
      const r = await client.from("front_snapshots").insert(row);
      if (r && r.error && (row.known_mask || row.bonus != null)) {
        // database not migrated yet: fall back to the plain shape
        const r2 = await client.from("front_snapshots").insert({ user_id: row.user_id, language_id: lang, known: known, cat_known: catKnown || {} });
        return r2 && r2.error ? { error: r2.error.message } : { ok: true };
      }
      return r && r.error ? { error: r.error.message } : { ok: true };
    } catch (e) { return { offline: true }; }
  }
  // A fighter row per language they actually study (v8 fighter_languages). Only
  // needed by clients that want to know before a snapshot exists; standings
  // already carries it. Fire-and-forget.
  async function enrolLanguage(lang, uid, primary) {
    try {
      if (!canPush) return { blocked: true };
      if (!(await ready())) return { offline: true };
      let id = uid;
      if (!id) { const u = await client.auth.getUser(); id = u && u.data && u.data.user ? u.data.user.id : null; }
      if (!id) return { error: "not signed in" };
      const row = { user_id: id, language_id: lang };
      // sent only when the caller means it, so opening a second language never
      // demotes the first one
      if (primary) row.is_primary = true;
      const r = await client.from("fighter_languages").upsert(row, { onConflict: "user_id,language_id" });
      return r && r.error ? { error: r.error.message } : { ok: true };
    } catch (e) { return { offline: true }; }
  }
  // Everyone's current numbers, one row per fighter per language. Tries the v8
  // shape (is_bot / is_primary), then the v6 shape, then rebuilds client-side —
  // so this works whatever the live database has had applied to it.
  async function standings() {
    const v8 = await restGet("standings?select=slot,name,language_id,user_id,known,bonus,cat_known,computed_at,is_primary,is_bot");
    if (v8 && v8.length) return v8;
    const view = await restGet("standings?select=slot,name,language_id,user_id,known,bonus,cat_known,computed_at");
    if (view && view.length) return view;
    const people = await roster2();
    if (!people) return null;
    const snaps = await restGet("front_snapshots?select=user_id,language_id,known,cat_known,computed_at&order=computed_at.desc&limit=5000");
    const best = {};
    (snaps || []).forEach(function (s) {
      const k = s.user_id + "|" + s.language_id;
      if (!best[k]) best[k] = s;
    });
    return people.map(function (f) {
      const s = best[f.user_id + "|" + f.language_id] || {};
      return {
        slot: f.slot, name: f.name, language_id: f.language_id, user_id: f.user_id,
        known: s.known || 0, bonus: 0, cat_known: s.cat_known || {}, computed_at: s.computed_at || null
      };
    });
  }
  // roster with user_id, needed to line snapshots up with fighters
  async function roster2() {
    return retry(function () { return restGet("fighters?select=slot,name,language_id,user_id"); }, 2);
  }
  // masks are only fetched for the few fighters that need them (you, your
  // teammates, your nemesis) — never for the whole ladder
  async function masksFor(userIds, lang) {
    if (!userIds || !userIds.length) return {};
    const list = userIds.map(function (i) { return '"' + i + '"'; }).join(",");
    const rows = await restGet("latest_fronts?select=user_id,known_mask&language_id=eq." + encodeURIComponent(lang) + "&user_id=in.(" + encodeURIComponent(list) + ")");
    const out = {};
    (rows || []).forEach(function (r) { if (r.known_mask) out[r.user_id] = r.known_mask; });
    return out;
  }
  // Rivals are per language from v8 (declaring a nemesis in German used to
  // overwrite the French one). Pre-v8 databases have no language_id column, so
  // the select falls back to the old shape.
  async function velocities(days) {
    const d = days || 7;
    const since = new Date(Date.now() - d * 86400000).toISOString();
    const rows = await restGet("front_snapshots?select=user_id,language_id,known,computed_at&computed_at=gte."
      + encodeURIComponent(since) + "&order=computed_at.asc&limit=5000");
    if (!rows) return null;
    const first = {}, last = {};
    rows.forEach(function (r) {
      const k = r.user_id + "|" + r.language_id;
      if (first[k] == null) first[k] = r.known || 0;
      last[k] = r.known || 0;
    });
    const out = {};
    Object.keys(last).forEach(function (k) { out[k] = Math.max(0, (last[k] || 0) - (first[k] || 0)); });
    return out;
  }
  async function rivals(lang) {
    const q = lang ? "&language_id=eq." + encodeURIComponent(lang) : "";
    const v8 = await restGet("rivals?select=user_id,rival_user_id,language_id,updated_at" + q);
    if (v8) return v8;
    const rows = await restGet("rivals?select=user_id,rival_user_id,updated_at");
    return rows || null;
  }
  async function setRival(rivalUserId, lang) {
    try {
      if (!(await ready())) return { offline: true };
      const u = await client.auth.getUser();
      if (!u || !u.data || !u.data.user) return { error: "not signed in" };
      const base = { user_id: u.data.user.id, rival_user_id: rivalUserId, updated_at: new Date().toISOString() };
      if (lang) {
        const row = Object.assign({ language_id: lang }, base);
        const r = await client.from("rivals").upsert(row, { onConflict: "user_id,language_id" });
        if (!(r && r.error)) return { ok: true };
      }
      const r2 = await client.from("rivals").upsert(base, { onConflict: "user_id" });
      return r2 && r2.error ? { error: r2.error.message } : { ok: true };
    } catch (e) { return { offline: true }; }
  }
  // ---- challenges (the Vocab Map's declarations of war) -------------------
  // Public by design: the map shows who declared whom. Each row banks both
  // sides' counts at signing, so only words learned inside the term count.
  async function challenges(lang) {
    const q = lang ? "&language_id=eq." + encodeURIComponent(lang) : "";
    const rows = await restGet("challenges?select=id,challenger,target,language_id,term_days,started_at,base_challenger,base_target,settled_at,winner,margin,forfeited_by" + q + "&order=started_at.desc&limit=200");
    return rows || null;
  }
  async function startChallenge(spec) {
    try {
      if (!canPush) return { blocked: true };
      if (!(await ready())) return { offline: true };
      const u = await client.auth.getUser();
      if (!u || !u.data || !u.data.user) return { error: "not signed in" };
      const row = { challenger: u.data.user.id, target: spec.target, language_id: spec.language_id,
        term_days: spec.term_days || 7, base_challenger: spec.base_challenger || 0, base_target: spec.base_target || 0 };
      const r = await client.from("challenges").insert(row).select("id").limit(1);
      if (r && r.error) return { error: r.error.message };
      return { ok: true, id: r && r.data && r.data[0] ? r.data[0].id : null };
    } catch (e) { return { offline: true }; }
  }
  async function settleChallenge(id, patch) {
    try {
      if (!canPush) return { blocked: true };
      if (!(await ready())) return { offline: true };
      const row = Object.assign({ settled_at: new Date().toISOString() }, patch || {});
      const r = await client.from("challenges").update(row).eq("id", id);
      return r && r.error ? { error: r.error.message } : { ok: true };
    } catch (e) { return { offline: true }; }
  }
  // ---- MASTER layer (word_states) -----------------------------------------
  // The authoritative per-word record. Private to its owner, upserted (never
  // appended), protected server-side by a monotonic `rev`: an older write is
  // discarded by the database, so two devices can never roll each other back.
  // The SUB layer (front_snapshots) stays exactly as it was — derived counts,
  // public, read for the ladder and the duel. Master is never built from sub.
  async function pushState(lang, payload) {
    try {
      if (!canPush) return { blocked: true };
      if (!(await ready())) return { offline: true };
      const u = await client.auth.getUser();
      if (!u || !u.data || !u.data.user) return { error: "not signed in" };
      const cachedS = cachedUid();
      if (cachedS && u.data.user.id !== cachedS) {
        try { await client.auth.signOut(); } catch (e) {}
        return { error: "wrong account was signed in — now signed out" };
      }
      const row = {
        user_id: u.data.user.id, language_id: lang, rev: Date.now(),
        cards: payload.cards || {}, known: payload.known || 0,
        known_mask: payload.mask || null, cat_known: payload.catKnown || {},
        xp: payload.xp || 0, stats: payload.stats || {}, badges: payload.badges || {},
        days: payload.days || {}, tier_floor: payload.tierFloor || 0
      };
      const r = await client.from("word_states").upsert(row, { onConflict: "user_id,language_id" });
      return r && r.error ? { error: r.error.message } : { ok: true, rev: row.rev };
    } catch (e) { return { offline: true }; }
  }
  // Your own master row. Tried before any snapshot: word-exact, not a count.
  async function pullState(lang) {
    const me = await whoAmI();
    if (!me) return null;
    if (!(await ready())) return null;
    try {
      const r = await client.from("word_states")
        .select("cards,known,known_mask,cat_known,xp,stats,badges,days,tier_floor,rev,updated_at")
        .eq("language_id", lang).eq("user_id", me).limit(1);
      if (r.error) return null;
      return (r.data && r.data[0]) || null;
    } catch (e) { return null; }
  }
  async function whoAmI() {
    const fast = cachedUid();
    if (fast) return fast;
    try {
      if (!(await ready())) return null;
      const u = await client.auth.getUser();
      const id = u && u.data && u.data.user ? u.data.user.id : null;
      if (id) { try { const s = JSON.parse(localStorage.getItem("bl-session") || "null"); if (s) cacheUid(s.slot, s.name, id); } catch (e) {} }
      return id;
    } catch (e) { return null; }
  }
  // userId optional: with it, only that person's snapshots are considered.
  // Without it (legacy callers), newest snapshot for the language — any user.
  async function latestFront(lang, userId) {
    const uf = userId ? "&user_id=eq." + encodeURIComponent(userId) : "";
    const base = "front_snapshots?language_id=eq." + encodeURIComponent(lang) + uf + "&order=computed_at.desc&limit=1&select=user_id,known,cat_known,computed_at";
    const fast = await retry(async function () {
      // v4 columns first; a pre-migration database 400s that select, so fall
      // back to the plain shape rather than returning nothing.
      const v4 = await restGet(base + ",known_mask,bonus");
      if (v4) return v4;
      return restGet(base);
    }, 2);
    if (fast) return fast[0] || null;
    if (!(await ready())) return null;
    const v = await retry(async function () {
      try {
        let q = client.from("front_snapshots").select("user_id,known,cat_known,computed_at").eq("language_id", lang);
        if (userId) q = q.eq("user_id", userId);
        const r = await q.order("computed_at", { ascending: false }).limit(1);
        if (r.error) return null;
        return r.data && r.data[0] ? r.data[0] : false;
      } catch (e) { return null; }
    }, 3);
    return v || null;
  }
  // The signed-in user's own newest snapshot — call right after login to
  // hydrate a fresh device. One filtered REST call once whoAmI resolves.
  async function myFront(lang) {
    const me = await whoAmI();
    if (!me) return null;
    return latestFront(lang, me);
  }
  return { enabled: ok, canPush: canPush, ready: ready, login: login, register: register, roster: roster, rosterFull: roster2,
    pushSnapshot: pushSnapshot, latestFront: latestFront, myFront: myFront, pushState: pushState, pullState: pullState,
    standings: standings, masksFor: masksFor, enrolLanguage: enrolLanguage, velocities: velocities,
    rivals: rivals, setRival: setRival, whoAmI: whoAmI,
    challenges: challenges, startChallenge: startChallenge, settleChallenge: settleChallenge };
})();
