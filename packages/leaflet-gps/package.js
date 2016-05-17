Package.describe({
  name: "keplerjs:leaflet-gps",
  summary: "Keplerjs Leaflet Gps",
  version: "1.0.0"
});

Npm.depends({
  "leaflet": "0.7.7",
  "leaflet-gps": "1.0.2"
});

Package.onUse(function (api) {
  api.versionsFrom(['METEOR@1.0']);
  api.addFiles([
    '.npm/package/node_modules/leaflet-gps/dist/leaflet-gps.src.js',
    '.npm/package/node_modules/leaflet-gps/dist/leaflet-gps.src.css',
  ],'client');
});