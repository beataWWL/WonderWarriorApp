// Service worker — baseline installable PWA.
// Activates immediately on install; no caching strategy yet.
// To add offline support later, add a `fetch` handler that reads from a
// Cache Storage bucket (or use Workbox / Serwist).

const VERSION = "v2-2026-04-24";

self.addEventListener("install", () => {
  // Take over as soon as this SW finishes installing.
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  // Claim all open clients on activation so the SW controls them without reload.
  event.waitUntil(self.clients.claim());
});

// Fetch listener present (even as pass-through) so browsers recognize this
// as a functional SW for installability. Extend with caching as needed.
self.addEventListener("fetch", () => {
  // default: network
});

// Keep VERSION referenced so future cache-busting cleanup logic has a hook.
self.SW_VERSION = VERSION;
