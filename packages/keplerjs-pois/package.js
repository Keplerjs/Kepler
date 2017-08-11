
Package.describe({
  name: 'keplerjs:pois',
  summary: 'keplerjs plugin pois',
  version: "1.1.0",
  git: "https://github.com/Keplerjs/Kepler.git"
});

Package.onUse(function(api) {

  api.versionsFrom("METEOR@1.0");
  
  api.use([
    'keplerjs:core@1.1.0',
    'keplerjs:osm@1.1.0',
  ]);

  api.addFiles([
    'plugin.js',
    'i18n/it.js',
    'i18n/en.js',
    'collections/pois.js'
  ]);

  api.addFiles([
    'client/Pois.js',
    'client/Place_pois.js',
    'client/helpers.js',
    'client/views/markers.html', 
    'client/views/popups.html',    
    'client/views/panels.html',
    'client/views/panels.js',
    'client/router.js'    
  ],'client');

  api.addFiles([
    'server/pubs.js',
  ],'server');
  
  api.export([
    'Pois'
  ]);
});
