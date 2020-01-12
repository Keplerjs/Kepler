var version = '1.7.0';

Package.describe({
  version: version,
  name: 'keplerjs:geoinfo',
  summary: 'keplerjs plugin geoinfo',
  git: "https://github.com/Keplerjs/Kepler.git"
});

Npm.depends({
  "suncalc": "1.8.0"
});

Package.onUse(function(api) {
  api.use([
    'keplerjs:core@'+version,
  ]);

  api.versionsFrom("1.5.1");

  api.addFiles([
    '.npm/package/node_modules/suncalc/suncalc.js'
  ],'client');

  api.use([
    'robodo:async@0.9.0',
  ],'server');

  api.addFiles([
    'plugin.js',
    'i18n/it.js',
    'i18n/en.js',
    'i18n/de.js',
    'i18n/es.js',
    'i18n/fr.js',
  ]);

  api.addFiles([
    'client/Geoinfo.js',
    'client/stylesheets/main.css',
    'client/views/markers.html',
    'client/views/panels.html',
    //'client/views/panels.js',
    'client/views/edit.html',
    'client/views/edit.js',
    'client/views/items.html',
    'client/views/popups.html',
    'client/views/popups.js'
  ],'client');

  api.addFiles([
    'server/Geoapi.js',
    'server/Geoinfo.js',
    'server/places.js',
    'server/admin.js',    
  ],'server');

});
