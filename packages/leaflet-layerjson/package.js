Package.describe({
  name: "keplerjs:leaflet-layerjson",
  summary: "Keplerjs Leaflet Layerjson",
  version: "1.0.0"
});

Npm.depends({
  "leaflet": "0.7.7",
  "leaflet-layerjson": "0.1.8",
});

Package.onUse(function (api) {
  api.versionsFrom(['METEOR@1.0']);
  api.addFiles([
    '.npm/package/node_modules/leaflet-layerjson/dist/leaflet-layerjson.src.js'
  ],'client');
});