
Package.describe({
  name: 'keplerjs:geoinfo',
  summary: 'keplerjs plugin geoinfo',
  version: '0.0.1',
  git: ''
});

Npm.depends({
  "suncalc": "1.8.0"
});

Package.onUse(function(api) {

  api.versionsFrom("METEOR@1.0");
  
  api.addFiles([
    '.npm/package/node_modules/suncalc/suncalc.js'
  ],'client');

  api.use([
    'keplerjs:core@0.0.1',
  ]);

  api.use([
    'http@1.1.3',
    'robodo:async@0.9.0',
  ],'server');

  api.addFiles([
    'plugin.js',
    'i18n/it.js',
    'i18n/en.js'
  ]);

  api.addFiles([
    'client/Geoinfo.js',
    'client/helpers.js',
    'client/stylesheets/popups.css',
    'client/views/panels.html',
    'client/views/popups.html',
    'client/views/popups.js'
  ],'client');

  api.addFiles([
    'server/Geoapi.js',
    'server/Geoinfo.js',
    'server/places.js',  
  ],'server');
  
});
