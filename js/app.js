function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this;
    var args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  };
}

var askPopup = {
  isOpen: false,
  denied: false
};
var permissionPopup = document.querySelector(".permission-popup");
var yesButton = document.querySelector("#btnYes");
var noButton = document.querySelector("#btnNo");
// https://web-push-codelab.glitch.me/
var applicationServerPublicKey = 'BCHnh0_JxlFFss2pLB2atDFonYZU5mLiS9-cKxxmyiEmWG5GqBiAHAQOo1LspkItdPlkaz0gxE19i4dqrl9ApgU';

// for push protocols
function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}


// initialize the button clicks
function initEvents() {
  yesButton.addEventListener("click", function() {
    navigator.serviceWorker.ready
      .then(function(swReg) {
        swReg.pushManager
          .subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlB64ToUint8Array(applicationServerPublicKey)
          })
          .then(function(subscription) {
            console.log(subscription);
            // TODO: 파이어베이스 DB에 저장하는 로직 구현
          })
          .catch(function(error) {
            console.log(error);
          });
      })
      .catch(function(error) {
        console.log(error);
      });
  });
  noButton.addEventListener("click", closePermissionPopup);
}

function openPermissionPopup() {
  permissionPopup.classList.add("open");
  askPopup.isOpen = true;
}

function closePermissionPopup() {
  permissionPopup.classList.remove("open");
  askPopup.denied = true;
  askPopup.isOpen = false;
}

function askPermission() {
  // get the scroll position
  var currentScrollPosition = window.scrollY + window.innerHeight;
  var documentHeight = document.body.clientHeight;
  var scrollPercentageInPage = (currentScrollPosition / documentHeight) * 100;
  // show the popup
  if (
    scrollPercentageInPage > 80 &&
    !askPopup.isOpen &&
    !askPopup.denied &&
    isServiceWorkerSupported &&
    isPushSupported
  ) {
    // console.log("popup opened");
    openPermissionPopup();
  }
}

window.addEventListener("scroll", debounce(askPermission, 20, true));
initEvents();
