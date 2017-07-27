
Package.describe({
  name: 'keplerjs:i18n',
  summary: 'keplerjs Internationalization package',
  version: '0.0.1',
  git: ''
});

Package.onUse(function(api) {

  api.versionsFrom("METEOR@1.0");

  var packages = [
    'anti:i18n'
  ];

  api.use(packages);
  api.imply(packages);

  api.addFiles([
    'i18n/it.js',
    'i18n/en.js',
    'config.js'
  ]);

  api.export([
    'i18n'
  ]);
  
});
