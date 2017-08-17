'use strict';

// Firebase real-time db
var db = firebase.database();
// Service Workers
var isSubscribed = false;
var swRegistration = null;
var pushButton = document.querySelector('#pushBtn');

function initialiseUI() {
  pushButton.addEventListener('click', function(event) {
    event.preventDefault();
    if (isSubscribed) {
      // unSubscribeUser();
    } else {
      subscribeUser();
    }
  });

  // Notification 구현여부 확인
  if (!(swRegistration.showNotification)) {
    console.log('Notifications aren\'t supported on service workers.');
  } else {
    console.log('Notifications are supported on this service worker.');
  }

  // Notification 권한 확인
  if (Notification.permission === 'denied') {
    console.log('The user has blocked notifications.');
    return;
  }

  // Push 메시지 지원여부 확인
  if (!('PushManager' in window)) {
    console.log('Push messaging isn\'t supported.');
    return;
  } else {
    console.log("PushManager is supported.");
  }

  navigator.serviceWorker.ready.then(function(swRegistration) {
    swRegistration.pushManager.getSubscription().then(function(subscription) {
      isSubscribed = !(subscription === null);

      // updateSubscriptionOnServer(subscription);

      if (isSubscribed) {
        console.log('User is subscribed.');

        var endpoint = subscription.endpoint;
        var p256dh = subscription.getKey('p256dh');
        var key = btoa(String.fromCharCode.apply(null, new Uint8Array(p256dh)));

        sendDeviceKeytoFirebase(endpoint, key);
      } else {
        console.log('User is NOT subscribed.');
      }
    });
  });
}

function subscribeUser() {
  swRegistration.pushManager.subscribe({
    userVisibleOnly: true
  })
  .then(function(subscription) {
    console.log('User is subscribed:', subscription);

    var endpoint = subscription.endpoint.split('send/')[1];
    var p256dh = subscription.getKey('p256dh');
    var key = btoa(String.fromCharCode.apply(null, new Uint8Array(p256dh)));

    sendDeviceKeytoFirebase(endpoint, key);
    isSubscribed = true;
  })
  .catch(function(err) {
    console.log('Failed to subscribe the user: ', err);
  });
}

function sendDeviceKeytoFirebase(endpoint, key) {
  return db.ref('users/').set({
    endpoint: endpoint,
    key: key,
    time: getCurrentTime()
  }).then(function () {
    console.log("The key has been sent to Firebase DB");
  }).catch(function () {
    console.error('Sending a key to server has been failed');
  });
}

function getCurrentTime() {
  return new Date().toLocaleString();
}
