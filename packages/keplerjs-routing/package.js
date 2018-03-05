Package.describe({
  name: "keplerjs:routing",
  summary: "Keplerjs routing plugin",
  version: "1.2.3",
  git: "https://github.com/Keplerjs/Kepler.git"
});

Npm.depends({
  //
});

Package.onUse(function (api) {

  api.versionsFrom("1.5.1");

  api.use([
    'keplerjs:core@1.2.3'
  ]);

  api.addFiles([
    'plugin.js',
/*  'i18n/it.js',
    'i18n/en.js',
  	'i18n/de.js',
  	'i18n/es.js',
  	'i18n/fr.js',	*/
  ]);

  api.addFiles([
    'client/Routing.js'
  ],'client');

  api.addFiles([
    'server/Routing.js'
  ],'server');

});
