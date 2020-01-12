var version = '1.7.0';

Package.describe({
  version: version,
  name: 'keplerjs:theme',
  summary: 'keplerjs plugin base Theme for UI',
  git: "https://github.com/Keplerjs/Kepler.git"
});

Package.onUse(function(api) {
  api.use([
    'keplerjs:core@'+version,
  ]);

  api.versionsFrom("1.5.1");

  api.addFiles([
    'plugin.js',
    'i18n/it.js',
    'i18n/en.js',
    'i18n/de.js',
    'i18n/es.js',
    'i18n/fr.js',	
  ]);

  api.addFiles([
    'client/stylesheets/icons.css',
    'client/stylesheets/lib/bootstrap.css',
    'client/stylesheets/lib/leaflet.css',
    'client/stylesheets/lib/switch.css',
    'client/stylesheets/main.css',
    'client/home.html'
  ], 'client');

  api.addAssets([
    'assets/images/avatar.svg',
    'assets/images/back-hex.png',
    'assets/images/back-hex.svg',
    'assets/images/favicon.ico',
    'assets/images/favicon.png',
    'assets/images/loader-bar.gif',
    'assets/images/loader-default.gif',
    'assets/images/loader-icon.gif',
    'assets/images/loader-lg.gif',
    'assets/images/logo-100.png',
    'assets/images/logo-200.png',
    'assets/images/logo-300.png',
    'assets/images/logo-32.png',
    'assets/images/logo-50.png',
    'assets/images/logo-app.png',
    'assets/images/logo.svg',
    'assets/images/sprite.svg',
    //'assets/images/sprite_grey.svg'
  ], 'client');

});
