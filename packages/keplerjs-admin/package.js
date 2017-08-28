
Package.describe({
  name: 'keplerjs:admin',
  summary: 'keplerjs plugin for administration of platform',
  version: "1.2.0",
  git: "https://github.com/Keplerjs/Kepler.git"
});

Package.onUse(function(api) {

  api.versionsFrom("METEOR@1.0");

  api.use([
    'keplerjs:core@1.2.0',
    'keplerjs:edit@1.2.0'
  ]);

  api.addFiles([
    'plugin.js',
    'i18n/it.js',
    'i18n/en.js',
	'i18n/de.js'
  ]);

  api.addFiles([
    'modules/Admin.js'
  ]);

  api.addFiles([
    'client/Place_admin.js',
    'client/helpers.js',
    'client/views/panels.html',
    'client/views/panels.js',
    //'client/router.js'
  ],'client');

  api.addFiles([
    'server/admin.js',
    'server/places.js',
    'server/users.js'
  ],'server');

});
