
Package.describe({
  name: "keplerjs:googlemaps",
  summary: "Keplerjs Goole Maps API",
  version: "1.0.0"
});

Npm.depends({
  "googlemaps": "0.1.9",
});

Package.onUse(function (api) {
  api.versionsFrom(['METEOR@1.0']);
  api.addFiles([
    'Googlemaps.js'
  ],'server');
  api.export('Googlemaps');
});