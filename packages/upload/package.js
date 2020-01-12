var version = '1.7.0';

Package.describe({
  version: version,
  name: 'keplerjs:upload',
  summary: 'keplerjs plugin for files upload',
  git: "https://github.com/Keplerjs/Kepler.git"
});

Package.onUse(function(api) {
  api.use([
    'keplerjs:core@'+version,
  ]);

  api.versionsFrom("1.5.1");

  api.addFiles([
    'plugin.js',
    'i18n/it.js',
    'i18n/en.js',
    'i18n/de.js',
    'i18n/es.js',
    'i18n/fr.js',	
    'i18n/sv.js', 
  ]);

  api.addFiles([
    'client/Upload.js',
    'client/views/inputFileUpload.html',
    'client/views/inputFileUpload.js',
    'client/stylesheets/panels.css'
  ],'client');

  api.addFiles([
    'server/upload.js',
  ],'server');

});
