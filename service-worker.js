// ===========================
// Service Worker für Offline-Funktionalität
// Optional: Für vollständiges Offline-Caching
// ===========================

const CACHE_NAME = "cosmetic-onboarding-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./css/styles.css",
  "./js/app.js",
  "./js/signature.js",
  "./js/pdf-generator.js",
  "./js/i18n.js",
  "./assets/logo.png",
  // Note: Icons are loaded from CDN (icons8.com)
  // Note: JavaScript libraries are loaded from CDN
  // The app will require internet for first load
];

// Install Event - Cache alle Ressourcen
self.addEventListener("install", (event) => {
  console.log("[Service Worker] Installing...");

  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("[Service Worker] Caching app shell");
        return cache.addAll(
          urlsToCache.map((url) => new Request(url, { cache: "reload" })),
        );
      })
      .catch((error) => {
        console.error("[Service Worker] Cache failed:", error);
      }),
  );

  self.skipWaiting();
});

// Activate Event - Alte Caches löschen
self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Activating...");

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("[Service Worker] Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );

  self.clients.claim();
});

// Fetch Event - Serve from Cache, fallback to Network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone the request
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then((response) => {
          // Check if valid response
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          // Cache the fetched response for next time
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        });
      })
      .catch(() => {
        // Offline fallback
        return new Response(
          "Offline - bitte überprüfe deine Internetverbindung",
          {
            headers: { "Content-Type": "text/plain" },
          },
        );
      }),
  );
});

// Message Event - für manuelle Cache-Updates
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }

  if (event.data && event.data.type === "CLEAR_CACHE") {
    caches.delete(CACHE_NAME).then(() => {
      console.log("[Service Worker] Cache cleared");
    });
  }
});
