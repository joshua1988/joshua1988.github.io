const { generateSW } = require("workbox-build");

const swDest = "sw.js";
generateSW({
  swDest,
  skipWaiting: true,
  globDirectory: "_site/",
  globPatterns: [
    "**/*.{js,png,css,jpg,ico,json,eot,svg,ttf,woff,woff2,otf,jpeg,gif}",
    // "index.html"
    // NOTE: default values
    // "**/*.{html,js,png,css,jpg,ico,json,eot,svg,ttf,woff,woff2,otf,jpeg,gif}"
    // NOTE: partial values
    // "images/*.{png,css,jpg,ico,eot,svg,ttf,woff,woff2,otf,jpeg,gif}",
    // "fonts/*.{png,css,jpg,ico,eot,svg,ttf,woff,woff2,otf,jpeg,gif}",
    // "js/*.{js}",
    // "atom.xml",
    // "favicon.ico",
    // "index.html",
    // "manifest.json",
    // "sitemap.xml",
  ],
  globIgnores: [
    // basic
    "_posts/_backup/**",
    "workbox-config.js",
    "pwa-build.js",
    "firebase-function/**",
    "**/demo.html",
    "js/pwa-push.js",
    "package.json",
    "package-lock.json",
    "preflight_.png",
    "node_modules",
    // pwa push file
    "js/app.js"
  ],
  cleanupOutdatedCaches: true,
  // Increase the limit to 4mb:
  maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
  // Define runtime caching rules.
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.googleapis\.com/,
      handler: "StaleWhileRevalidate"
    },
    {
      urlPattern: /^https:\/\/fonts\.gstatic\.com/,
      // Apply a cache-first strategy.
      handler: "CacheFirst",
      options: {
        // Fall back to the cache after 10 seconds.
        // networkTimeoutSeconds: 10,
        // Use a custom cache name.
        cacheName: "google-fonts-webfonts",
        // cache for a week
        expiration: {
          maxAgeSeconds: 60 * 60 * 24 * 7 // a week long
        }
      }
    },
    {
      urlPattern: /web-development/,
      handler: "NetworkFirst",
      options: {
        cacheName: "pages",
        expiration: {
          maxAgeSeconds: 60 * 60 * 24 * 7 // a week long
        }
      },
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
