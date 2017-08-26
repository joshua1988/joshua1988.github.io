const request = require('request-promise');

const pushURL = "https://android.googleapis.com/gcm/send";
const FCMPushServerKey = "key=" + "AAAAKGUavjw:APA91bGaFUTRfbIeuNUE3DvaOAfJxiayFtaHNDITMA5F32jnjHcivRthgP6h7yNt-BuGtpUg2ESqwXq22juEUeWfo9fG8ne1wlAZoHwlRWiv2YjdE88JcNguLv-n8418RMpxE8ARlfsV";

function makePostRequest() {
  return request({
    uri: pushURL,
    method: 'POST',
    headers: {
      'Authorization' : FCMPushServerKey
    },
    json: true,
    body: {
      "registration_ids" : ["em7OFi2pb0g:APA91bHMJ_Z8Q10cI3I5-SptWGLqFS4CU0R9CtLuxPKpn_FJfV5SWoJkhwMe5aFkz8fdCQ10G9fGSd2y_XOi6QPYpSD62LbRvacAYt0Bk7QHviuReSK5K9JaFkcZ2XiTvF85DSWC73kj"],
      "data": {
        "post_title": "This is a Firebase Cloud Messaging Topic Message!",
        "post_content": "This is the content",
        "post_url": "current url"
      }
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
