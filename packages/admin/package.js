var version = '1.7.0';

Package.describe({
  version: version,
  name: 'keplerjs:admin',
  summary: 'keplerjs plugin for administration of platform',
  git: "https://github.com/Keplerjs/Kepler.git"  
});

Package.onUse(function(api) {
  api.use([
    'keplerjs:core@'+version,
    'keplerjs:edit@'+version
  ]);

  api.versionsFrom('1.5.1');

  api.addFiles([
    'plugin.js',
    'i18n/it.js',
    'i18n/en.js',
    'i18n/de.js',
    'i18n/es.js',
    'i18n/fr.js'
  ]);

  api.addFiles([
    'modules/Admin.js'
  ]);

  api.addFiles([
    'client/Place_admin.js',
    'client/helpers.js',
    'client/views/pages/admin.html',
    'client/views/pages/admin.js',
    'client/views/pages/places.html',
    'client/views/pages/places.js',    
    'client/views/pages/users.html',
    'client/views/pages/users.js',
    'client/views/panels.html',
    //'client/views/panels.js',
    'client/views/admin.html',
    'client/views/admin.js',
    'client/stylesheets/panels.css',
    'client/Router.js'
  ],'client');

  api.addFiles([
    'server/admin.js',
    'server/places.js',
    'server/users.js',
    'server/pubs.js'
  ],'server');

});
