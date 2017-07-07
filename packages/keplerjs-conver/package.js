
Package.describe({
  name: 'keplerjs:conver',
  summary: 'keplerjs plugin conversations',
  version: '0.0.1',
  git: ''
});

Package.onUse(function(api) {

  api.versionsFrom("METEOR@1.0");
  
  api.use([
    'verron:autosize'
  ],'client');
/*
  api.addFiles([
    'plugin.js'
  ],['client','server']);

  api.addFiles([
    'client/views/panels.html'
  ],'client');

  api.addFiles([
    'server/modules/Geoinfo.js',
    'server/admin.js',
  ],'server');
  */
});
