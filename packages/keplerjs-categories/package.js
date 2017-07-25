
Package.describe({
  name: 'keplerjs:categories',
  summary: 'keplerjs places categories',
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
    'i18n/it.js'
  ]);
  
});
