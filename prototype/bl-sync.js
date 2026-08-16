// BuddyLingo sync layer — talks to Supabase. Accounts are claim-once:
// credentials derive from slot+name+PIN, verified server-side (never in the page).
// All calls fail soft: no server, no config, no network => app stays local.
window.BLSync = (function () {
  const cfg = window.BL_CONFIG || {};
  const ok = !!(cfg.url && cfg.anonKey && String(cfg.url).indexOf("YOUR-") === -1 && String(cfg.anonKey).indexOf("YOUR-") === -1);
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
  async function login(slot, name, pin) {
    if (!(await ready())) return { offline: true };
    try {
      const r = await client.auth.signInWithPassword({ email: email(slot, name), password: pass(pin, name) });
      return r.error ? { error: r.error.message } : { ok: true };
    } catch (e) { return { offline: true }; }
  }
  function firstFree(rows) {
    const by = {}; (rows || []).forEach(function (f) { by[f.slot] = f; });
    for (let i = 0; i < 10; i++) if (!by[i]) return i;
    return null;
  }
  async function register(slot, name, lang, pin) {
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
  async function pushSnapshot(lang, known, catKnown) {
    try {
      if (!(await ready())) return;
      const u = await client.auth.getUser();
      if (!u || !u.data || !u.data.user) return;
      await client.from("front_snapshots").insert({ user_id: u.data.user.id, language_id: lang, known: known, cat_known: catKnown || {} });
    } catch (e) {}
  }
  async function latestFront(lang) {
    const fast = await retry(function () {
      return restGet("front_snapshots?select=known,cat_known,computed_at&language_id=eq." + encodeURIComponent(lang) + "&order=computed_at.desc&limit=1");
    }, 2);
    if (fast) return fast[0] || null;
    if (!(await ready())) return null;
    const v = await retry(async function () {
      try {
        const r = await client.from("front_snapshots").select("known,cat_known,computed_at").eq("language_id", lang).order("computed_at", { ascending: false }).limit(1);
        if (r.error) return null;
        return r.data && r.data[0] ? r.data[0] : false;
      } catch (e) { return null; }
    }, 3);
    return v || null;
  }
  return { enabled: ok, ready: ready, login: login, register: register, roster: roster, pushSnapshot: pushSnapshot, latestFront: latestFront };
})();
