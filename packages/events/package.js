Package.describe({
  version: "1.4.0",
  name: 'keplerjs:events',
  summary: 'keplerjs plugin events',
  git: "https://github.com/Keplerjs/Kepler.git"
});

Package.onUse(function(api) {

  api.versionsFrom("1.5.1");
  
  api.use([
    'keplerjs:core',
  ]);

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
