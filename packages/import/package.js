var version = '1.4.9';

Package.describe({
  version: version,
  name: 'keplerjs:import',
  summary: 'keplerjs plugin for import data',
  git: "https://github.com/Keplerjs/Kepler.git"
});

Package.onUse(function(api) {
  api.use([
    'keplerjs:core@'+version,
    'keplerjs:admin@'+version,
  ]);

  api.versionsFrom("1.5.1");

  api.addFiles([
    'plugin.js',
    'i18n/it.js',
    'i18n/en.js',
    'i18n/de.js',
    'i18n/es.js',
    'i18n/fr.js',	
  ]);

  api.addFiles([
    'collections/places.js'
  ]);

  api.addFiles([
    'client/Import.js',
    'client/views/panels.html',
    'client/views/panels.js',
    'client/router.js',   
  ],'client');

  api.addFiles([
    'server/import.js',
    'server/pubs.js',
  ],'server');

});
