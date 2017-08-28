
Package.describe({
  name: 'keplerjs:geoinfo',
  summary: 'keplerjs plugin geoinfo',
  version: "1.1.0",
  git: "https://github.com/Keplerjs/Kepler.git"
});

Npm.depends({
  "suncalc": "1.8.0"
});

Package.onUse(function(api) {

  api.versionsFrom("METEOR@1.0");

  api.addFiles([
    '.npm/package/node_modules/suncalc/suncalc.js'
  ],'client');

  api.use([
    'keplerjs:core@1.1.0',
  ]);

  api.use([
    'http',
    'robodo:async',
  ],'server');

  api.addFiles([
    'plugin.js',
    'i18n/it.js',
    'i18n/en.js',
	'i18n/de.js'
  ]);

  api.addFiles([
    'client/Geoinfo.js',
    'client/stylesheets/popups.css',
    'client/views/panels.html',
    'client/views/popups.html',
    'client/views/popups.js'
  ],'client');

  api.addFiles([
    'server/Geoapi.js',
    'server/Geoinfo.js',
    'server/admin.js',
    'server/places.js',
  ],'server');

});
