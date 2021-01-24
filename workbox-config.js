// TODO: 아래 글 참고해서 workbox-webpack-plugin의 InjectManifest 기능 사용해보기
// https://gist.github.com/jeffposnick/fc761c06856fa10dbf93e62ce7c4bd57
// https://deanhume.com/displaying-a-new-version-available-progressive-web-app/
// https://web.dev/precache-with-workbox/

module.exports = {
  "globDirectory": "_site/",
  "globPatterns": [
    "**/*.{html,js,png,css,jpg,ico,json,eot,svg,ttf,woff,woff2,otf,jpeg,key,gif}"
  ],
  "swSrc": "sw-custom.js",
  "swDest": "sw.js",
  "globIgnores": [
    "_posts/_backup/**",
    "workbox-config.js",
    "pwa-build.js",
    "firebase-function/**",
    "**/demo.html",
    "js/pwa-push.js",
    "package.json",
    "package-lock.json",
    "preflight_.png"
  ],
};