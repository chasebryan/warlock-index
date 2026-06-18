const CACHE_NAME = "workspace-pwa-990dc1e7b124";
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./corpus.js",
  "./manifest.webmanifest",
  "./icons/wi-icon.svg",
  "./icons/wi-144.png",
  "./icons/wi-192.png",
  "./icons/wi-512.png",
  "./icons/wi-maskable-192.png",
  "./icons/wi-maskable-512.png",
  "./icons/apple-touch-icon.png"
];

const APP_SHELL_URLS = new Set(APP_SHELL.map((asset) => new URL(asset, self.location.href).href));

function cacheResponse(request, response) {
  if (response.ok) {
    const copy = response.clone();
    caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
  }

  return response;
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (APP_SHELL_URLS.has(url.href)) {
    event.respondWith(
      fetch(request)
        .then((response) => cacheResponse(request, response))
        .catch(() => caches.match(request).then((cached) => cached || caches.match("./index.html")))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;

      return fetch(request)
        .then((response) => cacheResponse(request, response))
        .catch(() => caches.match("./index.html"));
    })
  );
});
