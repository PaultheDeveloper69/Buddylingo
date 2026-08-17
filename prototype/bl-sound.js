// BuddyLingo sound — the app is silent by design. Two jobs:
//   1. hard-mute every media element, including any added later (the hero clips
//      are decorative and were bleeding audio through on some devices)
//   2. one subtle, satisfying click on press — synthesised, no audio files,
//      no autoplay, nothing before the user's first gesture
// Off switch: localStorage "bl-sound" = "off".
window.BLSound = (function () {
  let ctx = null, armed = false;
  function enabled() {
    try { return localStorage.getItem("bl-sound") !== "off"; } catch (e) { return true; }
  }
  function setEnabled(on) {
    try { localStorage.setItem("bl-sound", on ? "on" : "off"); } catch (e) {}
  }
  function arm() {
    if (armed) return;
    armed = true;
    try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { ctx = null; }
  }
  // a short wooden tick: pitch drop + a breath of filtered noise, ~35ms
  function click(strength) {
    if (!enabled()) return;
    arm();
    if (!ctx) return;
    if (ctx.state === "suspended") { try { ctx.resume(); } catch (e) {} }
    const t = ctx.currentTime, hard = strength === "hard";
    const osc = ctx.createOscillator(), g = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(hard ? 760 : 1080, t);
    osc.frequency.exponentialRampToValueAtTime(hard ? 320 : 620, t + 0.035);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(hard ? 0.075 : 0.05, t + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, t + (hard ? 0.09 : 0.055));
    osc.connect(g).connect(ctx.destination);
    osc.start(t); osc.stop(t + 0.12);
    // tiny transient so it reads as a physical click rather than a beep
    const n = ctx.createBufferSource(), buf = ctx.createBuffer(1, 256, ctx.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
    n.buffer = buf;
    const ng = ctx.createGain(), hp = ctx.createBiquadFilter();
    hp.type = "highpass"; hp.frequency.value = 1800;
    ng.gain.setValueAtTime(hard ? 0.05 : 0.03, t);
    ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.03);
    n.connect(hp).connect(ng).connect(ctx.destination);
    n.start(t);
  }
  function silence(root) {
    const list = (root || document).querySelectorAll("video, audio");
    for (let i = 0; i < list.length; i++) {
      const m = list[i];
      m.muted = true; m.volume = 0;
      m.setAttribute("muted", "");
      m.removeAttribute("controls");
    }
  }
  function start() {
    silence();
    // anything the app renders later gets muted too
    try {
      new MutationObserver(function () { silence(); }).observe(document.documentElement, { childList: true, subtree: true });
    } catch (e) {}
    document.addEventListener("pointerdown", function (e) {
      const el = e.target && e.target.closest ? e.target.closest("button, [role=button], a[href]") : null;
      if (!el || el.disabled) return;
      const big = el.getAttribute("data-cta") !== null || (el.offsetHeight >= 50 && el.offsetWidth >= 120);
      click(big ? "hard" : "soft");
    }, true);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
  return { click: click, silence: silence, enabled: enabled, setEnabled: setEnabled };
})();
