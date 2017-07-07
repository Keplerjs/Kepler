
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
    'robodo:async',
  ],'server');

  api.addFiles([
    'plugin.js',
  ]);

  api.addFiles([
    'client/helpers.js',
    'client/views/panels.html'
  ],'client');

  api.addFiles([
    'server/modules/Geoinfo.js',
   // 'server/admin.js',
  ],'server');
  
});
