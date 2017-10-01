
Package.describe({
  name: 'keplerjs:favorites',
  summary: 'keplerjs plugin favorites places',
  version: "1.2.3",
  git: "https://github.com/Keplerjs/Kepler.git"
});

Package.onUse(function(api) {

  api.versionsFrom("1.5.1");

  api.use([
    'keplerjs:core@1.2.3',
  ]);

  api.addFiles([
    'plugin.js',
    'i18n/it.js',
    'i18n/en.js',
	'i18n/de.js',
	'i18n/es.js',
	'i18n/fr.js',
  ]);

  api.addFiles([
    'client/views/items.html',
    'client/views/items.js',
    'client/views/panels.html',
    'client/views/panels.js',
    'client/Profile_favorites.js',
    'client/Place_favorites.js',
    'client/User_favorites.js',
    'client/router.js',
    'client/stylesheets/favorites.css',
  ],'client');

  api.addFiles([
    'server/admin.js',
    'server/profile.js'
  ],'server');

});
