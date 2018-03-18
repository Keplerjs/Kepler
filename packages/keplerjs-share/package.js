
Package.describe({
  name: 'keplerjs:share',
  summary: 'keplerjs plugin share',
  version: "1.2.4",
  git: "https://github.com/Keplerjs/Kepler.git"
});

Package.onUse(function(api) {

  api.versionsFrom("1.5.1");

  api.use([
    'keplerjs:core@1.2.4',
    'zenorocha:clipboard@1.7.1'
  ]);

  api.addFiles([
    'plugin.js',
    'i18n/it.js',
    'i18n/en.js',
    'i18n/de.js',
    'i18n/es.js',
    'i18n/fr.js',	
  ]);

  api.addFiles([
    'client/views/popups.html',
    'client/views/popups.js',
    'client/views/panels.html',
    'client/views/panels.js',
    'client/router.js'
  ],'client');

});
