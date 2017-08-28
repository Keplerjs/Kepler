
Package.describe({
  name: 'keplerjs:events',
  summary: 'keplerjs plugin events',
  version: "1.2.0",
  git: "https://github.com/Keplerjs/Kepler.git"
});

Package.onUse(function(api) {

  api.versionsFrom("METEOR@1.0");
  
  api.use([
    'keplerjs:core@1.2.0',
  ]);

  api.addFiles([
    'plugin.js',
    'i18n/it.js',
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
