
Package.describe({
  name: 'keplerjs:geoinfo',
  summary: 'keplerjs plugin geoinfo',
  version: '0.0.1',
  git: ''
});

Package.onUse(function(api) {

  api.versionsFrom("METEOR@1.0");
  
  api.use([
    'alisalaah:suncalc',
    'keplerjs:core'
  ]);

  api.use([
    'http',
    'robodo:async',
  ],'server');

  api.addFiles([
    'plugin.js',
    'i18n/it.js'
  ]);

  api.addFiles([
    'client/helpers.js',
    'client/stylesheets/popups.css',
    'client/views/panels.html',
    'client/views/popups.html',
    'client/views/popups.js'
  ],'client');

  api.addFiles([
    'server/modules/Geoapi.js',
    'server/modules/Geoinfo.js',
    'server/places.js',
    'server/users.js'    
  ],'server');
  
});
