
Package.describe({
  name: 'keplerjs:i18n',
  summary: 'keplerjs Internationalization package',
  version: "1.2.4",
  git: "https://github.com/Keplerjs/Kepler.git"
});

Package.onUse(function(api) {

  api.versionsFrom("1.5.1");

  var packages = [
    'anti:i18n@0.4.3'
  ];

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

  api.export([
    'i18n'
  ]);

});
