var version = '1.5.3';

Package.describe({
  version: version,
  name: 'keplerjs:photos',
  summary: 'keplerjs plugin for manage photos',
  git: "https://github.com/Keplerjs/Kepler.git"
});

Package.onUse(function(api) {
  api.use([
    'keplerjs:core@'+version,
    'keplerjs:upload@'+version,
  ]);

  api.versionsFrom("1.5.1");

  api.use([
    //TODO use only npm 
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
    'client/Profile_photos.js',    
    'client/views/panels.html',
    'client/views/panels.js',
  ],'client');

  api.addFiles([
    'server/photos.js',
  ],'server');

});
