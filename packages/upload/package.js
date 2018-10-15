Package.describe({
  version: "1.4.0",
  name: 'keplerjs:upload',
  summary: 'keplerjs plugin for files upload',
  git: "https://github.com/Keplerjs/Kepler.git"
});

Package.onUse(function(api) {

  api.versionsFrom("1.5.1");

  api.use([
    'keplerjs:core',
  ]);

  api.use([
    'mrt:imagemagick@0.1.2',
  ], 'server');

  api.addFiles([
    'plugin.js',
    'i18n/it.js',
    'i18n/en.js',
    'i18n/de.js',
    'i18n/es.js',
    'i18n/fr.js',	
  ]);

  api.addFiles([
    'client/Upload.js',
    'client/views/inputFileUpload.html',
    'client/views/inputFileUpload.js',
    'client/views/panels.html',
    'client/views/panels.js',
  ],'client');

  api.addFiles([
    'server/upload.js',
  ],'server');

});
