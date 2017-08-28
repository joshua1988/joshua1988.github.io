// @@ Firebase Clouding Messaging HTTP Server Protocol Spec
// https://firebase.google.com/docs/cloud-messaging/http-server-ref#notification-payload-support
const request = require('request-promise');

// const pushURL = "https://android.googleapis.com/gcm/send";
const FCMPushURL = "https://fcm.googleapis.com/fcm/send";
const FCMPushServerKey = "key=" + "AAAAKGUavjw:APA91bGaFUTRfbIeuNUE3DvaOAfJxiayFtaHNDITMA5F32jnjHcivRthgP6h7yNt-BuGtpUg2ESqwXq22juEUeWfo9fG8ne1wlAZoHwlRWiv2YjdE88JcNguLv-n8418RMpxE8ARlfsV";

function makePostRequest() {
  return request({
    uri: FCMPushURL,
    method: 'POST',
    headers: {
      'Authorization' : FCMPushServerKey
    },
    json: true,
    body: {
      "registration_ids": ["fQ16LSSwDyM:APA91bFVnPyEV5uQ_pNc3esuuH30_gRxkh5xSXK0rI0yFV6_OTt_J07V0LOXFzVCJTM1Cf2BLe7ecV3n0egW0PBbTTrB8wY2CRMkdl6rDwe_UpziEiax_k8_kMg7Xm5fIQouc5RYZ1X1"],
      "notification": {
         "title": "Portugal vs. Denmark",
         "body": "5 to 1",
         "icon": "firebase-logo.png",
         "click_action": "http://localhost:8081"
       },
    }
    // resolveWithFullResponse: true
  }).then(response => {
    if (response.statusCode >= 400) {
      throw new Error(`HTTP Error: ${response.statusCode}`);
    }
    // console.log('SUCCESS! Posted', event.data.ref);
    console.log("success", response);
  });
};

makePostRequest();
