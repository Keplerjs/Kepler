
Package.describe({
  name: 'keplerjs:favorites',
  summary: 'keplerjs plugin favorites places',
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
    'client/views/items.html',
    'client/views/items.js',    
    'client/views/panels.html',
    'client/Profile_favorites.js',
    'client/Place_favorites.js',
    'client/router.js',
    'client/stylesheets/favorites.css',
  ],'client');

  api.addFiles([
    'server/admin.js',
    'server/profile.js'
  ],'server');
  
});
