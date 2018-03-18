
Package.describe({
  name: 'keplerjs:tracks',
  summary: 'keplerjs plugin tracks',
  version: "1.2.4",
  git: "https://github.com/Keplerjs/Kepler.git"
});

Package.onUse(function(api) {

  api.versionsFrom("1.5.1");

  api.use([
    'keplerjs:core@1.2.4',
    'keplerjs:osm@1.2.4',
    'keplerjs:geoinfo@1.2.4'
  ]);

  api.addFiles([
    'plugin.js',
    'i18n/it.js',
    'i18n/en.js',
    'i18n/de.js',
    'i18n/es.js',
    'i18n/fr.js',	
    'collections/tracks.js'
  ]);

  api.addFiles([
    'client/Place_tracks.js',
    'client/views/popups.html',
    'client/views/panels.html',
    'client/views/panels.js',
    'client/stylesheets/tracks.css',
    'client/router.js'
  ],'client');

  api.addFiles([
  	'server/admin.js',
    'server/pubs.js',
    'server/tracks.js'
  ],'server');

  api.export([
    'Tracks'
  ]);

});
