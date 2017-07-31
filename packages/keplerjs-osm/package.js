Package.describe({
  name: "keplerjs:osm",
  summary: "Keplerjs Openstreetmap and Overpass API",
  version: "1.1.0",
  git: "https://github.com/Keplerjs/Kepler.git"
});

Npm.depends({
  "query-overpass": "1.1.0",
});

Package.onUse(function (api) {
  
  api.versionsFrom(['METEOR@1.0']);
  
  api.use([
    'keplerjs:core@1.1.0',
  ]);

  api.addFiles([
    'plugin.js',
    'collections/osm.js'
  ]);
  
  api.addFiles([
    'client/Osm.js'
  ],'client');

  api.addFiles([
    'server/osm.js',
    'server/pubs.js'
  ],'server');

});