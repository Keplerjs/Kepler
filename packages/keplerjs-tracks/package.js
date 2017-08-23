
Package.describe({
  name: 'keplerjs:tracks',
  summary: 'keplerjs plugin tracks',
  version: "1.1.0",
  git: "https://github.com/Keplerjs/Kepler.git"
});

Package.onUse(function(api) {

  api.versionsFrom("METEOR@1.0");

  api.use([
    'keplerjs:core@1.1.0',
    'keplerjs:osm@1.1.0',
    'keplerjs:geoinfo@1.1.0'
  ]);

  api.addFiles([
    'plugin.js',
    'i18n/it.js',
    'i18n/en.js',
	'i18n/de.js',
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
