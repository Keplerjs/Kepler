
Package.describe({
  name: 'keplerjs:upload',
  summary: 'keplerjs plugin for files upload',
  version: '0.0.1',
  git: ''
});

Package.onUse(function(api) {

  api.versionsFrom("METEOR@1.0");

  api.use([
    'mrt:imagemagick@0.1.2',   
  ], 'server');

  api.use([  
    'keplerjs:core@0.0.1',
  ]);

  api.addFiles([
    'plugin.js',
    'i18n/it.js',
    'i18n/en.js'
  ]);

  api.addFiles([
    'client/Upload.js',
    'client/views/inputfile.html',
    'client/views/inputfile.js',
  ],'client');

  api.addFiles([
    'server/upload.js',
  ],'server');

});
