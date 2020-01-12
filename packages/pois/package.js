var version = '1.7.0';

Package.describe({
  version: version,
  name: 'keplerjs:pois',
  summary: 'keplerjs plugin pois',
  git: "https://github.com/Keplerjs/Kepler.git"
});

Package.onUse(function(api) {
  api.use([
    'keplerjs:core@'+version,
    'keplerjs:osm@'+version,
  ]);

  api.versionsFrom("1.5.1");

  api.addFiles([
    'plugin.js',
    'i18n/it.js',
    'i18n/en.js',
    'i18n/de.js',
    'i18n/es.js',
    'i18n/fr.js',	
    'collections/pois.js'
  ]);

  api.addFiles([
    'client/Pois.js',
    'client/Place_pois.js',
    'client/helpers.js',
    'client/views/markers.html',
    'client/views/popups.html',
    'client/views/panels.html',
    'client/views/panels.js',
    'client/stylesheets/pois.css',
    'client/Router.js'
  ],'client');

  api.addFiles([
  	'server/pois.js',
  	'server/admin.js',
    'server/pubs.js',
  ],'server');

  api.export([
    'Pois'
  ]);
});
