const WORKSPACE_URL = new URL("../workspace/", self.location.href).href;

self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key.startsWith("wi-pwa-")).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);
  if (url.origin === self.location.origin && url.pathname.startsWith("/wi/")) {
    event.respondWith(Response.redirect(WORKSPACE_URL, 302));
  }
});
