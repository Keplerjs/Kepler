/*

TODO split this plugin in keplerjs:geoapi(server api) and keplerjs:geoinfo(client views)

*/
Package.describe({
  name: 'keplerjs:geoinfo',
  summary: 'keplerjs plugin geoinfo',
  version: '0.0.1',
  git: ''
});

Package.onUse(function(api) {

  api.versionsFrom("METEOR@1.0");
  
  api.use([
    'keplerjs:core'
  ]);

  api.addFiles([
    'startup.js'
  ],['client','server']);

  api.addFiles([
    'client/views/panels.html'
  ],'client');

  api.addFiles([
    'server/modules/geoinfo.js',
    'server/admin.js',
  ],'server');
  
});
