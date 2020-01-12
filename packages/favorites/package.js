var version = '1.7.0';

Package.describe({
  version: version,
  name: 'keplerjs:favorites',
  summary: 'keplerjs plugin favorites places',
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
    'i18n/fr.js',
  ]);

  api.addFiles([
    'client/views/markers.html',
    'client/views/items.html',
    'client/views/items.js',
    'client/views/panels.html',
    'client/views/panels.js',
    'client/Profile_favorites.js',
    'client/Place_favorites.js',
    'client/User_favorites.js',
    'client/Router.js',
    'client/stylesheets/favorites.css',
  ],'client');

  api.addFiles([
    'server/admin.js',
    'server/profile.js',
    'server/places.js'
  ],'server');

});
