
Package.describe({
  name: 'keplerjs:edit',
  summary: 'keplerjs plugin for edit place informations',
  version: "1.2.0",
  git: "https://github.com/Keplerjs/Kepler.git"
});

Package.onUse(function(api) {

  api.versionsFrom("METEOR@1.0");

  api.use([
    'keplerjs:core@1.2.0',
  ]);

  api.addFiles([
    'plugin.js',
    'i18n/it.js',
    'i18n/en.js',
	'i18n/de.js'
  ]);

  api.addFiles([
    'client/lib/L.Marker.drag.js',
    'client/Place_edit.js',
    'client/views/panels.html',
    'client/views/panels.js',
    'client/views/popups.html',
    'client/views/popups.js',
    'client/router.js'
  ],'client');

  api.addFiles([
    'server/places.js'
  ],'server');

});
