Package.describe({
  name: "keplerjs:overpass",
  summary: "Keplerjs Overpass API",
  version: "1.0.0"
});

Npm.depends({
  "query-overpass": "1.1.0",
});

Package.onUse(function (api) {
  api.versionsFrom(['METEOR@1.0']);
  api.addFiles([
    'Overpass.js'
  ],'server');
  api.export('Overpass');
});