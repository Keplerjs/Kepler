
Package.describe({
  name: 'keplerjs:share',
  summary: 'keplerjs plugin share',
  version: "1.2.0",
  git: "https://github.com/Keplerjs/Kepler.git"
});

Package.onUse(function(api) {

  api.versionsFrom("METEOR@1.0");

  api.use([
    'keplerjs:core@1.2.0',
    'zenorocha:clipboard'
  ]);

  api.addFiles([
    'plugin.js',
    'i18n/it.js',
    'i18n/en.js',
	'i18n/de.js'
  ]);

  api.addFiles([
    'client/views/popups.html',
    'client/views/panels.html',
    'client/views/panels.js',
    'client/router.js'
  ],'client');

});
