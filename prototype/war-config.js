// Vocab War — rule configuration. ALL tunable numbers live here (rules_version tracks changes).
window.WAR_CFG = {
  rulesVersion: 1, mapVersion: 1, contentVersion: 1,
  claimThreshold: 55,      // % a faction needs to claim a NEUTRAL tile
  contestBand: 8,          // rival within this many points of owner => CONTESTED
  decisiveMargin: 8,       // challenger must lead owner by more than this to flip a tile
  minCardsForEligibility: 10, // reviews-seen before a fighter counts in the faction average
  masteryByBox: [30, 45, 60, 75, 85, 95, 100], // demonstrated recognition mastery per SRS box
  lapsedMastery: 20, unseenMastery: 0,
  historyLimit: 8,
  factions: [
    { id: "fr", name: "Français", app: "Vocab French.dc.html", color: "#d62828", tint: "#f3d2ce",
      sigil: "M12 3 C13.5 6 13.5 9 12 11 C10.5 9 10.5 6 12 3 Z M7 9 C9 10 10 12 9.5 14 L7.5 13 C6.5 11.5 6.5 10 7 9 Z M17 9 C17.5 10 17.5 11.5 16.5 13 L14.5 14 C14 12 15 10 17 9 Z M9 15 L15 15 L14.5 17 L9.5 17 Z M11 17.5 L13 17.5 L12.5 21 L11.5 21 Z" },
    { id: "el", name: "Ελληνικά", app: "Vocab Greek.dc.html", color: "#2160a8", tint: "#d2dfee",
      sigil: "M5 5 L19 5 L19 7 L5 7 Z M7 8 L9 8 L9 17 L7 17 Z M11 8 L13 8 L13 17 L11 17 Z M15 8 L17 8 L17 17 L15 17 Z M5 18 L19 18 L19 20 L5 20 Z" },
    { id: "de", name: "Deutsch", app: "Vocab German.dc.html", color: "#946f00", tint: "#eadfc0",
      sigil: "M12 3 L15 8 L21 9 L16.5 13 L18 20 L12 16.5 L6 20 L7.5 13 L3 9 L9 8 Z" },
    { id: "es", name: "Español", app: "Vocab Spanish.dc.html", color: "#c2571d", tint: "#f1dccb",
      sigil: "M12 7 A5 5 0 1 1 11.99 7 Z M12 1 L13 5 L11 5 Z M12 23 L11 19 L13 19 Z M1 12 L5 11 L5 13 Z M23 12 L19 13 L19 11 Z M4 4 L7.5 6.5 L6.5 7.5 Z M20 4 L17.5 7.5 L16.5 6.5 Z M4 20 L6.5 16.5 L7.5 17.5 Z M20 20 L16.5 17.5 L17.5 16.5 Z" },
    { id: "tn", name: "Tounsi", app: "Vocab Tunisian.dc.html", color: "#2a8c46", tint: "#d4e9da",
      sigil: "M14 3 A9 9 0 1 0 14 21 A7.2 7.2 0 1 1 14 3 Z M16.5 9 L17.4 11.3 L19.8 11.3 L17.9 12.8 L18.6 15.2 L16.5 13.8 L14.4 15.2 L15.1 12.8 L13.2 11.3 L15.6 11.3 Z" }
  ]
};
