const CACHE_NAME = 'pediatric-drug-calculator-v1';
const urlsToCache = [
  '/',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

const API_CACHE_NAME = 'api-cache-v1';
const STATIC_CACHE_NAME = 'static-cache-v1';

// Install event - cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== STATIC_CACHE_NAME && cacheName !== API_CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // Handle API requests
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Clone the response since it can only be consumed once
          const responseToCache = response.clone();
          
          // Cache API responses for offline use
          caches.open(API_CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
          
          return response;
        })
        .catch(() => {
          // If fetch fails, try to serve from cache
          return caches.match(event.request);
        })
    );
    return;
  }
  
  // Handle static assets
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version if available
        if (response) {
          return response;
        }
        
        // Otherwise, fetch from network
        return fetch(event.request)
          .then(response => {
            // Clone the response
            const responseToCache = response.clone();
            
            // Cache the fetched resource
            caches.open(STATIC_CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          });
      })
  );
});

// Background sync for when the app comes back online
self.addEventListener('sync', event => {
  if (event.tag === 'sync-calculations') {
    event.waitUntil(
      // Sync any pending calculations or data
      syncPendingData()
    );
  }
});

// Handle push notifications
self.addEventListener('push', event => {
  const options = {
    body: event.data.text(),
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Details',
        icon: '/icons/icon-72x72.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icons/icon-72x72.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Pediatric Drug Calculator', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Helper function to sync pending data
async function syncPendingData() {
  try {
    // Get pending calculations from IndexedDB
    const pendingCalculations = await getPendingCalculations();
    
    // Sync each calculation
    for (const calculation of pendingCalculations) {
      await syncCalculation(calculation);
    }
    
    // Clear synced calculations
    await clearSyncedCalculations();
  } catch (error) {
    console.error('Sync failed:', error);
  }
}

// Mock functions for IndexedDB operations
async function getPendingCalculations() {
  // In a real implementation, this would query IndexedDB
  return [];
}

async function syncCalculation(calculation) {
  // In a real implementation, this would sync with the server
  console.log('Syncing calculation:', calculation);
}

async function clearSyncedCalculations() {
  // In a real implementation, this would clear synced items from IndexedDB
  console.log('Clearing synced calculations');
}