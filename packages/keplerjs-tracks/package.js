
Package.describe({
  name: 'keplerjs:tracks',
  summary: 'keplerjs plugin tracks',
  version: '0.0.1',
  git: ''
});

Package.onUse(function(api) {

  api.versionsFrom("METEOR@1.0");
  
  api.use([
    'keplerjs:core@0.0.1',
    'keplerjs:geoinfo@0.0.1'
  ]);

  api.addFiles([
    'plugin.js',
    'i18n/it.js',
    'i18n/en.js',
    'collections/tracks.js',
    'collections/queries.js'
  ]);

  api.addFiles([
    'client/Place_tracks.js',
    'client/views/popups.html',    
    'client/views/panels.html',
    'client/views/panels.js',
    'client/router.js'
  ],'client');

  api.addFiles([
    'server/pubs.js',
  ],'server');
  
});
