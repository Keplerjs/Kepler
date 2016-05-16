Package.describe({
  name: "keplerjs:leaflet-search",
  summary: "Keplerjs Leaflet Search",
  version: "1.0.0",
  git: "https://github.com/Leaflet/Leaflet.git"
});

Npm.depends({
  "leaflet": "0.7.7",
  "leaflet-search": "1.9.7"
});

Package.onUse(function (api) {
  api.versionsFrom(['METEOR@1.0']);
  api.addFiles([
    '.npm/package/node_modules/leaflet-search/dist/leaflet-search.src.js',
    '.npm/package/node_modules/leaflet-search/dist/leaflet-search.src.css',
  ],'client');
});