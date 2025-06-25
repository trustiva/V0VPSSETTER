const CACHE_NAME = "private-workspace-v1"
const urlsToCache = ["/", "/manifest.json", "/icon-192x192.png", "/icon-512x512.png"]

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)))
})

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version or fetch from network
      return response || fetch(event.request)
    }),
  )
})

// Handle push notifications (placeholder)
self.addEventListener("push", (event) => {
  const options = {
    body: "Your private workspace is ready!",
    icon: "/icon-192x192.png",
    badge: "/icon-192x192.png",
  }

  event.waitUntil(self.registration.showNotification("Private Workspace", options))
})
