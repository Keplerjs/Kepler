Package.describe({
  name: "keplerjs:leaflet",
  summary: "Keplerjs Leaflet",
  version: "1.0.0"
});

Npm.depends({
  "leaflet": "0.7.7"
});

Package.onUse(function (api) {
  api.versionsFrom(['METEOR@1.0']);
  api.addFiles([
    '.npm/package/node_modules/leaflet/dist/leaflet-src.js',
    '.npm/package/node_modules/leaflet/dist/leaflet.css',
  ],'client');
});