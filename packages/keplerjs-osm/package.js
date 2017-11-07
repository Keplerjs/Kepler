Package.describe({
  name: "keplerjs:osm",
  summary: "Keplerjs Openstreetmap and Overpass API",
  version: "1.2.3",
  git: "https://github.com/Keplerjs/Kepler.git"
});

Npm.depends({
  "query-overpass": "1.2.0",
});

Package.onUse(function (api) {

  api.versionsFrom("1.5.1");

  api.use([
    'keplerjs:core@1.2.3',
    'keplerjs:edit@1.2.3'
  ]);

  api.addFiles([
    'plugin.js',
    'i18n/it.js',
    'i18n/en.js',
	'i18n/de.js',
	'i18n/es.js',
	'i18n/fr.js',	
    'collections/osm.js'
  ]);

  api.addFiles([
    'client/Osm.js',
    'client/views/panels.html',
    'client/views/markers.html',
    'client/views/popups.html',
    'client/views/popups.js',
    'client/stylesheets/osm.css'
  ],'client');

  api.addFiles([
    'server/Osm.js',
    'server/places.js',
    'server/pubs.js'
  ],'server');

//TODO export Osm client and server
});
