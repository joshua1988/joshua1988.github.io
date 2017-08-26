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
  console.log("[Service Worker] Push Event : ", event);

  var title = 'Captain Pangyo Tech News';
  // var data = event.data.json();
  var data = event.data;
  console.log(data);

  var options = {
    body: data.post_title,
    // data: data.url,
    icon: './images/icons/144x.png',
    badge: '/images/icons/48x.png'
  };

  var notificationPromise = self.registration.showNotification(title, options);
  event.waitUntil(notificationPromise);
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  var siteURL = event.notification.data || 'https://joshua1988.github.io/';

  event.waitUntil(
    clients.matchAll({
      // type: 'window'
    }).then(matchedClients => {
      for (let client of matchedClients) {
        if (client.url === siteURL) {
          return client.focus();
        }
      }
      return clients.openWindow(siteURL);
    })
  );
});
