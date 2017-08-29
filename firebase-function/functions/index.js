const functions = require('firebase-functions');
const request = require('request-promise');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const pushURL = "https://android.googleapis.com/gcm/send";
const FCMPushServerKey = "key=" + "AAAAKGUavjw:APA91bGaFUTRfbIeuNUE3DvaOAfJxiayFtaHNDITMA5F32jnjHcivRthgP6h7yNt-BuGtpUg2ESqwXq22juEUeWfo9fG8ne1wlAZoHwlRWiv2YjdE88JcNguLv-n8418RMpxE8ARlfsV";

exports.sendPush = functions.https.onRequest((request, response) => {
  makePostRequest();
  return response.send("push sent");
});

function makePostRequest() {
  return request({
    uri: pushURL,
    method: 'POST',
    headers: {
      'Authorization' : FCMPushServerKey
    },
    json: true,
    body: {
      "registration_ids" : ["e2jClLAYnUA:APA91bHswI9RZUojJncrIl-75cpstV8KYR-y3tM9xcr1HdmftfM4z9v-hYleM6lZZHoaz4FB1bv9ov6KQIvd4GzM56ywHEikCd9J2w8cu7xF7tVbNmM2Q05ZxpVW9xk_dlhgxJWHpbSU"],
    }
    // resolveWithFullResponse: true
  }).then(response => {
    if (response.statusCode >= 400) {
      throw new Error(`HTTP Error: ${response.statusCode}`);
    }
    console.log('SUCCESS! Posted', event.data.ref);
  });
};
