
Package.describe({
  name: 'keplerjs:weather',
  summary: 'keplerjs plugin weather',
  version: "1.1.0",
  git: "https://github.com/Keplerjs/Kepler.git"
});

Package.onUse(function(api) {

  api.versionsFrom("METEOR@1.0");

  api.use([
    'keplerjs:core@1.1.0',
  ]);

  api.use([
    'http',
  ],'server');

  api.addFiles([
    'plugin.js',
    'i18n/it.js',
    'i18n/en.js',
	'i18n/de.js'
  ]);

  api.addFiles([
    'client/Place_weather.js',
    'client/views/panels.html',
    'client/views/panels.js',
    'client/stylesheets/panels/weather.css',
  ],'client');

  api.addAssets('assets/images/weather.png', 'client');

  api.addFiles([
    'server/weather.js',
  ],'server');

});
