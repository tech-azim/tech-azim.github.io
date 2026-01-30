const CACHE_NAME = "focus-v1";
const urlsToCache = ["./", "./index.html", "./manifest.json"];

// Install event - cache resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Opened cache");
        return cache.addAll(urlsToCache);
      })
      .catch((err) => console.log("Cache install failed:", err)),
  );
  self.skipWaiting();
});

// Fetch event - serve from cache, fallback to network
// Fetch event - serve from cache, fallback to network
self.addEventListener("fetch", (event) => {
  // Hanya proses request http/https, jangan cache chrome-extension atau file eksternal
  if (!event.request.url.startsWith("http")) {
    return;
  }
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        const fetchRequest = event.request.clone();
        return fetch(fetchRequest).then((response) => {
          // Hanya cache response dari origin yang sama
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return response;
        });
      })
      .catch(() => {
        // Return offline page if available
        return caches.match("./");
      }),
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );

  return self.clients.claim();
});

// Background sync for offline sessions (future enhancement)
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-sessions") {
    event.waitUntil(syncSessions());
  }
});

async function syncSessions() {
  // Future: sync offline session data when back online
  console.log("Syncing sessions...");
}
