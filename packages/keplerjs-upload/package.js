
Package.describe({
  name: 'keplerjs:upload',
  summary: 'keplerjs plugin for files upload',
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
  ],['client','server']);

  api.addFiles([
    'client/modules/Upload.js',
    //TODO 'client/views/inputfile.html',
    //TODO 'client/views/inputfile.js',
  ],'client');

  api.addFiles([
    'server/upload.js',
  ],'server');
  
});
