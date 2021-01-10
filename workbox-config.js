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