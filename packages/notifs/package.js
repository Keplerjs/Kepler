
Package.describe({
  name: 'keplerjs:notifs',
  summary: 'keplerjs plugin notifications',
  version: "1.2.5",
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
    'i18n/de.js',
    'i18n/es.js',
    'i18n/fr.js',
    'collections/notifs.js',
    'modules/Notif.js'
  ]);

  api.addFiles([
    'client/views/items.html',
    'client/views/panels.html',
    'client/views/panels.js',
    'client/views/sidebar.html',
    'client/views/sidebar.js',
    'client/router.js',
    'client/stylesheets/notif.css',
  ],'client');

  api.addFiles([
    'server/admin.js',
    'server/users.js'
  ],'server');

});
