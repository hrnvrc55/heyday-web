/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

importScripts(
  "/assets/js/precache-manifest.6715d655977bb42f24159c4b9813203a.js"
);

workbox.core.setCacheNameDetails({prefix: "asmobius"});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/.+(\/|.html|.php)$/, workbox.strategies.networkFirst({ "cacheName":"asmobius-html-cache", plugins: [new workbox.expiration.Plugin({"maxAgeSeconds":259200,"purgeOnQuotaError":false})] }), 'GET');
workbox.routing.registerRoute(/.+\.(js|css|woff)$/, workbox.strategies.cacheFirst({ "cacheName":"asmobius-dependent-cache", plugins: [new workbox.expiration.Plugin({"maxAgeSeconds":259200,"purgeOnQuotaError":false})] }), 'GET');
workbox.routing.registerRoute(/.+\.(png|gif|jpg|jpeg|svg)$/, workbox.strategies.cacheFirst({ "cacheName":"asmobius-image-cache", plugins: [new workbox.expiration.Plugin({"maxAgeSeconds":259200,"purgeOnQuotaError":false})] }), 'GET');
