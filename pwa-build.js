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
    "package-lock.json",
    "preflight_.png"
  ],
  cleanupOutdatedCaches: true,
  // Increase the limit to 4mb:
  maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
  // Define runtime caching rules.
  runtimeCaching: [
    {
      // Match any request that ends with .png, .jpg, .jpeg or .svg.
      urlPattern: /\.(?:png|jpg|jpeg|svg)$/,

      // Apply a cache-first strategy.
      handler: "CacheFirst",

      options: {
        // Use a custom cache name.
        cacheName: "images",

        // Only cache 10 images.
        expiration: {
          maxEntries: 10
        }
      }
    }
  ]
  // Other configuration options...
})
  .then(({ count, size }) => {
    console.log(
      `Generated ${swDest}, which will precache ${count} files, totaling ${size} bytes.`
    );
  })
  .catch(error => {
    console.log("# PWA Build ERROR - ", error);
  });
