
Package.describe({
  name: 'keplerjs:categories',
  summary: 'keplerjs places and users categorization',
  version: '0.0.1',
  git: ''
});

Package.onUse(function(api) {

  api.versionsFrom("METEOR@1.0");

  var packages = [
    'keplerjs:core',
  ];

  api.use(packages);
  api.imply(packages);

  api.addFiles([
    'plugin.js',
    'i18n/it.js',
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
