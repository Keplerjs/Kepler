var version = '1.7.0';

Package.describe({
  version: version,
  name: 'keplerjs:convers',
  summary: 'keplerjs plugin conversations and messages',
  git: "https://github.com/Keplerjs/Kepler.git"
});

Package.onUse(function(api) {
  api.use([
    'keplerjs:core@'+version,
  ]);

  api.versionsFrom("1.5.1");

  api.addFiles([
    'plugin.js',
    'i18n/it.js',
    'i18n/en.js',
    'i18n/de.js',
    'i18n/es.js',
    'i18n/fr.js'
  ]);

  api.addFiles([
    'collections/convers.js',
    'collections/messages.js',
    'collections/places.js'
  ]);

  api.addFiles([
    'client/Conver.js',
    'client/Place_conver.js',
    
    'client/Router.js',
    'client/stylesheets/items.css',
    'client/stylesheets/panels.css',
    'client/User_conver.js',
    'client/views/items/conver.html',
    'client/views/items/conver.js',
    'client/views/items/message.html',
    'client/views/items/message.js',
    'client/views/markers.html',
    'client/views/panels.html',
    'client/views/panels.js',
    'client/views/popups.html',
    'client/views/sidebar.html'
  ], 'client');

  api.addFiles([
    'server/admin.js',
    'server/convers.js',
    'server/pubs.js'
  ], 'server');

});
