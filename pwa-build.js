const { generateSW } = require("workbox-build");

const swDest = "sw.js";
generateSW({
  swDest,
  skipWaiting: true,
  globDirectory: "_site/",
  globPatterns: [
    "**/*.{html,js,png,css,jpg,ico,json,eot,svg,ttf,woff,woff2,otf,jpeg,gif}"
  ],
  globIgnores: [
    "_posts/_backup/**",
    "workbox-config.js",
    "pwa-build.js",
    "firebase-function/**",
    "**/demo.html",
    "js/pwa-push.js",
    "package.json",
    "package-lock.json"
  ]
  // Other configuration options...
}).then(({ count, size }) => {
  console.log(
    `Generated ${swDest}, which will precache ${count} files, totaling ${size} bytes.`
  );
});
