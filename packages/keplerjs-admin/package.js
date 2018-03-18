
Package.describe({
  name: 'keplerjs:admin',
  summary: 'keplerjs plugin for administration of platform',
  version: "1.2.4",
  git: "https://github.com/Keplerjs/Kepler.git"
});

Package.onUse(function(api) {

  api.versionsFrom('1.5.1');

  api.use([
    'keplerjs:core@1.2.4',
    'keplerjs:edit@1.2.4'
  ]);

  api.addFiles([
    'plugin.js',
    'i18n/it.js',
    'i18n/en.js',
    'i18n/de.js',
    'i18n/es.js',
    'i18n/fr.js'
  ]);

  api.addFiles([
    'modules/Admin.js',
    'collections/queries.js'
  ]);

  api.addFiles([
    'client/Profile_admin.js',
    'client/Place_admin.js',
    'client/helpers.js',
    'client/views/panels.html',
    'client/views/panels.js',
    'client/router.js'
  ],'client');

  api.addFiles([
    'server/admin.js',
    'server/places.js',
    'server/users.js'
  ],'server');

});
