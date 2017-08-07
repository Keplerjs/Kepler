
Package.describe({
  name: 'keplerjs:admin',
  summary: 'keplerjs plugin for administration of platform',
  version: "1.1.0",
  git: "https://github.com/Keplerjs/Kepler.git"
});

Package.onUse(function(api) {

  api.versionsFrom("METEOR@1.0");
  
  api.use([
    'keplerjs:core@1.1.0',
    'keplerjs:edit@1.1.0'
  ]);

  api.addFiles([
    'plugin.js',
/*    'i18n/it.js',
    'i18n/en.js'*/
  ]);

  api.addFiles([
    'modules/Admin.js'
  ]);

  api.addFiles([
    'client/Place_admin.js',
    'client/views/panels.html',
    //'client/views/panels.js',
/*    'client/views/popups.html',
    'client/views/popups.js',
    'client/router.js' */   
  ],'client');

  api.addFiles([
    'server/admin.js',
    'server/places.js',
    'server/users.js'
  ],'server');

});
