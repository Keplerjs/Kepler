
Package.describe({
  name: 'keplerjs:i18n',
  summary: 'keplerjs Internationalization package',
  version: "1.1.0",
  git: "https://github.com/Keplerjs/Kepler.git"
});

Package.onUse(function(api) {

  api.versionsFrom("METEOR@1.0");

  var packages = [
    'anti:i18n@0.4.3'
  ];

  api.use(packages);
  api.imply(packages);

  api.addFiles([
	'i18n/it.js',
    'i18n/en.js',
	'i18n/de.js',
    'config.js'
  ]);

  api.export([
    'i18n'
  ]);

});
