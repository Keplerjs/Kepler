var version = '1.5.3';

Package.describe({
  version: version,
  name: 'keplerjs:events',
  summary: 'keplerjs plugin events',
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
    'i18n/es.js',
    'i18n/fr.js',
    //'collections/events.js'
  ]);

/*  api.addFiles([
    'client/views/panels.html',
    'client/router.js'    
  ],'client');*/

/*  api.addFiles([
    'server/pubs.js',
  ],'server');*/
  
});
