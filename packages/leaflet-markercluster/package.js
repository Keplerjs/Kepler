Package.describe({
  name: "keplerjs:leaflet.markercluster",
  summary: "Keplerjs Leaflet Markercluster",
  version: "1.0.0"
});

Npm.depends({
  "leaflet": "0.7.7",
  "leaflet.markercluster": "0.5.0",
});

Package.onUse(function (api) {
  api.versionsFrom(['METEOR@1.0']);
  api.addFiles([
    '.npm/package/node_modules/leaflet.markercluster/dist/MarkerCluster.Default.css',
    '.npm/package/node_modules/leaflet.markercluster/dist/MarkerCluster.css',
    '.npm/package/node_modules/leaflet.markercluster/dist/leaflet.markercluster-src.js'
  ],'client');
});