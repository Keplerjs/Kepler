
Package.describe({
  name: 'keplerjs:categories',
  summary: 'keplerjs places and users categorization',
  version: "1.1.0",
  git: "https://github.com/Keplerjs/Kepler.git"
});

Package.onUse(function(api) {

  api.versionsFrom("METEOR@1.0");

  var packages = [
    'keplerjs:core@1.1.0',
  ];

  api.use(packages);
  api.imply(packages);

  api.addFiles([
    'plugin.js',
    'i18n/it.js',
    'i18n/en.js',
    'modules/Cats.js'
  ]);

  api.addFiles([
    'client/views/panels/place.html',
    'client/views/panels/place.js',
    'client/views/panels/user.html',
    'client/views/panels/user.js',
    'client/views/panels/settings.html',
    'client/views/panels/settings.js'
  ],'client');  
  
});
