var version = '1.5.4';

Package.describe({
  version: version,
  name: 'keplerjs:photos',
  summary: 'keplerjs plugin for manage photos',
  git: "https://github.com/Keplerjs/Kepler.git"
});

Npm.depends({
  'imagemagick': '0.1.3'
});

Package.onUse(function(api) {
  api.use([
    'keplerjs:core@'+version,
    'keplerjs:upload@'+version,
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
    'client/views/panels.html',
    'client/views/panels.js',
    'client/stylesheets/main.css'
  ],'client');

  api.addFiles([
    'server/photos.js',
    'server/profile.js',
    'server/places.js',
  ],'server');

});
