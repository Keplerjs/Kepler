var version = '1.7.0';

Package.describe({
  version: version,
  name: "keplerjs:osm",
  summary: "Keplerjs Openstreetmap and Overpass API",
  git: "https://github.com/Keplerjs/Kepler.git"
});

Npm.depends({
  "query-overpass": "1.2.0",
});

Package.onUse(function (api) {
  api.use([
    'keplerjs:core@'+version,
    'keplerjs:edit@'+version
  ]);

  api.versionsFrom("1.5.1");

  api.addFiles([
    'plugin.js',
    'i18n/it.js',
    'i18n/en.js',
    'i18n/de.js',
    'i18n/es.js',
    'i18n/fr.js',	
    'collections/places.js'
  ]);

  api.addFiles([
    'client/Osm.js',
    'client/views/helpers.js',
    'client/views/edit.html',
    'client/views/edit.js',
    'client/views/panels.html',
    'client/views/markers.html',
    'client/views/popups.html',
    'client/views/popups.js',
    'client/stylesheets/osm.css'
  ],'client');

  api.addFiles([
    'server/Osm.js',
    'server/Osm_queryBuilder.js',
    'server/Osm_queryCache.js',
    'server/places.js',
  ],'server');

//TODO export Osm client and server
});
