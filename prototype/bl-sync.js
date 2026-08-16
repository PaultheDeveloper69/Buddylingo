// BuddyLingo sync layer — talks to Supabase. Accounts are claim-once:
// credentials derive from slot+name+PIN, verified server-side (never in the page).
// All calls fail soft: no server, no config, no network => app stays local.
window.BLSync = (function () {
  const cfg = window.BL_CONFIG || {};
  const ok = !!(cfg.url && cfg.anonKey && String(cfg.url).indexOf("YOUR-") === -1 && String(cfg.anonKey).indexOf("YOUR-") === -1);
  let client = null;
  function c() {
    if (!client && ok && window.supabase) {
      try { client = window.supabase.createClient(cfg.url, cfg.anonKey); } catch (e) {}
    }
    return client;
  }
  function slug(name) { return String(name).toLowerCase().normalize("NFD").replace(/[^a-z0-9]/g, "").slice(0, 20) || "fighter"; }
  function email(slot, name) { return "f" + slot + "." + slug(name) + "@buddylingo.app"; }
  function pass(pin, name) { return "bl-" + pin + "-" + slug(name); }
  async function login(slot, name, pin) {
    if (!c()) return { offline: true };
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
    if (!c()) return { offline: true };
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
    if (!c()) return null;
    try {
      const r = await client.from("fighters").select("slot,name,language_id");
      return r.data || null;
    } catch (e) { return null; }
  }
  async function pushSnapshot(lang, known, catKnown) {
    try {
      if (!c()) return;
      const u = await client.auth.getUser();
      if (!u || !u.data || !u.data.user) return;
      await client.from("front_snapshots").insert({ user_id: u.data.user.id, language_id: lang, known: known, cat_known: catKnown || {} });
    } catch (e) {}
  }
  async function latestFront(lang) {
    try {
      if (!c()) return null;
      const r = await client.from("front_snapshots").select("known,cat_known,computed_at").eq("language_id", lang).order("computed_at", { ascending: false }).limit(1);
      return r.data && r.data[0] ? r.data[0] : null;
    } catch (e) { return null; }
  }
  return { enabled: ok, login: login, register: register, roster: roster, pushSnapshot: pushSnapshot, latestFront: latestFront };
})();
