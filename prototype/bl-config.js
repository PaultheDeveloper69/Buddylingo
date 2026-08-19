// BuddyLingo server config — Supabase project "buddylingo" (ref bpqzukfzazuccyhhxhaw)
// The "anon public" key is SAFE to publish: Row Level Security limits what it can do.
// Never put the secret / service_role key in here.
window.BL_CONFIG = {
  // TRUE in the design copy only. It turns on preview fighters, filler languages
  // and a sample archive so every card can be judged with no server behind it.
  // The published prototype ships FALSE: real rows or an empty state, never a
  // person who does not exist. This is the one line that differs between copies.
  previewData: false,
  // How many HUMAN login slots can be claimed (bot slots do not count against
  // it). Paul, Nancop and Ameni hold three, so 4 leaves exactly one open.
  // The database no longer caps accounts (schema-v8) — raise this to open more.
  alphaSlots: 4,
  // Languages to keep locked on the login grid even though the registry says
  // they are active. Empty: French, Greek and German are open (es/tn are marked
  // inactive in the registry and in the languages table).
  lockedLangs: [],
  url: "https://bpqzukfzazuccyhhxhaw.supabase.co",
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwcXp1a2Z6YXp1Y2N5aGh4aGF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY4Njc4NDIsImV4cCI6MjEwMjQ0Mzg0Mn0.iBj7D5oA3m7nbEMVBas3QQKyMrOiK0d8k8LG8WenZD8"
};
