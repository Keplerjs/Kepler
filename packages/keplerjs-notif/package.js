
Package.describe({
  name: 'keplerjs:notif',
  summary: 'keplerjs plugin notifications',
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
    'i18n/en.js',
    'collections/notifs.js',
    'modules/Notif.js'
  ]);

  api.addFiles([
    'client/views/items.html',
    'client/views/panels.html',
    'client/views/panels.js',
    'client/views/sidebar.html',
    'client/router.js',
    'client/stylesheets/notif.css',
  ],'client');

  api.addFiles([
    'server/admin.js',
    'server/users.js'
  ],'server');
  
});
