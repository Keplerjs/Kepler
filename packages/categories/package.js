var version = '1.5.8';

Package.describe({
  version: version,
  name: 'keplerjs:categories',
  summary: 'keplerjs places and users categorization',
  git: "https://github.com/Keplerjs/Kepler.git"
});

Package.onUse(function(api) {
  var packages = [
    'keplerjs:core@'+version,
    'keplerjs:edit@'+version,
  ];

  api.versionsFrom("1.5.1");

  api.use(packages);
  api.imply(packages);

  api.addFiles([
    'plugin.js',
    'i18n/it.js',
    'i18n/en.js',
    'i18n/de.js',
    'i18n/es.js',
    'i18n/fr.js',
    'i18n/sv.js',
    'modules/Cats.js',
    'collections/places.js',
    'collections/users.js',
    'collections/cats.js',
  ]);

  api.addFiles([
    'client/Router.js',
    'client/Place_cats.js',
    'client/User_cats.js',
    'client/views/panels/place.html',
    'client/views/panels/place.js',
    'client/stylesheets/main.css',    
    'client/views/panels/user.html',
    //'client/views/panels/user.js',
    'client/views/panels/settings.html',
    'client/views/panels/settings.js', 
    'client/views/panels/admin.html',
    'client/views/panels/admin.js',
  ],'client');

  api.addFiles([
    'server/admin.js',
    'server/users.js',
    'server/places.js',
    'server/cats.js'
  ],'server');

});
