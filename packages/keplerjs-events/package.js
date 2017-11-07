
Package.describe({
  name: 'keplerjs:events',
  summary: 'keplerjs plugin events',
  version: "1.2.3",
  git: "https://github.com/Keplerjs/Kepler.git"
});

Package.onUse(function(api) {

  api.versionsFrom("1.5.1");
  
  api.use([
    'keplerjs:core@1.2.3',
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
