
Package.describe({
  name: 'keplerjs:edit',
  summary: 'keplerjs plugin for edit place informations',
  version: "1.1.0",
  git: "https://github.com/Keplerjs/Kepler.git"
});

Package.onUse(function(api) {

  api.versionsFrom("METEOR@1.0");
  
  api.use([
    'keplerjs:core@1.1.0',
  ]);

  api.addFiles([
    'plugin.js',
    'i18n/it.js',
    'i18n/en.js'
  ]);

  api.addFiles([
    'client/Place_edit.js',    
    'client/views/panels.html',
    //'client/router.js'    
  ],'client');

/*  api.addFiles([
    'modules/Edit.js'
  ]);
*/
});
