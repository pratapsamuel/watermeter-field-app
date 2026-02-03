const CACHE_NAME = "meter-camera-cache-v2";
const FILES_TO_CACHE = [
  "./",
  "index.html",
  "manifest.json"
];

self.addEventListener("install", event => {
  self.skipWaiting();  // activate immediately
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim()); // take control of all pages
});

self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
