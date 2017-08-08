importScripts('js/vendor/sw-toolbox.js');

const precacheFiles = [
  './',
  // CSS
  './css/main.css',
  './css/prism.css',
  // Images
  './favicon.ico',
  './images/icons/48x.png',
  './images/icons/96x.png',
  './images/icons/144x.png',
  './images/icons/192x.png',
  './images/logo.png',
  './images/josh.png',
  // JS
  './js/main.js',
  './js/prism.js',
  './js/vendor/jquery-1.9.1.min.js',
  './js/vendor/sw-toolbox.js',
  './js/vendor/sw-toolbox.js.map',
];

// Precache the files
toolbox.precache(precacheFiles);

// Push Notification
self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');

  var title = 'Captain Pangyo Tech News';
  var options = {
    body: 'Yay it works.',
    icon: 'src/assets/images/logo-192.png',
    badge: 'src/assets/images/logo-96.png'
  };

  var notificationPromise = self.registration.showNotification(title, options);
  event.waitUntil(notificationPromise);
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('https://joshua1988.github.io/')
  );
});
