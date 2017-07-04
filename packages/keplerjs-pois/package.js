
Package.describe({
  name: 'keplerjs:pois',
  summary: 'keplerjs plugin pois',
  version: '0.0.1',
  git: ''
});

Package.onUse(function(api) {

  api.versionsFrom("METEOR@1.0");
  
  api.use([
    'keplerjs:core'
  ]);

  api.addFiles([
    'plugin.js',    
    'collections/pois.js'
  ],['client','server']);

  api.addFiles([
    'client/lib.js',
    'client/models/Place_pois.js',
    'client/views/popups.html',    
    'client/views/panels.html',
    'client/views/panels.js',
    'client/router.js'    
  ],'client');

  api.addFiles([
    'server/pubs.js',
  ],'server');
  
});
