var version = '1.7.0';

Package.describe({
  version: version,
  name: 'keplerjs:tracks',
  summary: 'keplerjs plugin tracks',
  git: "https://github.com/Keplerjs/Kepler.git"
});

Package.onUse(function(api) {
  api.use([
    'keplerjs:core@'+version,
    'keplerjs:osm@'+version,
    'keplerjs:geoinfo@'+version
  ]);

  api.versionsFrom("1.5.1");

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
    'client/Tracks.js',
    'client/Place_tracks.js',
    'client/views/popups.html',
    'client/views/panels.html',
    'client/views/panels.js',
    'client/stylesheets/tracks.css',
    'client/Router.js'
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
