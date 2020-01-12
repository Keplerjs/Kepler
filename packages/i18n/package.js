var version = '1.7.0';

Package.describe({
  version: version,
  name: 'keplerjs:i18n',
  summary: 'keplerjs Internationalization package',
  git: "https://github.com/Keplerjs/Kepler.git"
});

Package.onUse(function(api) {
  var packages = [
    'anti:i18n@0.4.3'
  ];
  
  api.versionsFrom("1.5.1");

  api.use(packages);
  api.imply(packages);

  api.addFiles([
    'i18n/it.js',
    'i18n/en.js',
    'i18n/de.js',
    'i18n/sv.js',
    'i18n/es.js',
    'i18n/fr.js',
    'config.js'
  ]);

  api.addFiles([
    'server/langs.js',
    'server/users.js',
  ],'server');

  api.export([
    'i18n'
  ]);

});
