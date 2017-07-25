
Package.describe({
  name: "keplerjs:googlemaps",
  summary: "Keplerjs Goole Maps API",
  version: "1.0.0"
});

Npm.depends({
  "googlemaps": "0.1.9",
});

Package.onUse(function (api) {
  
  api.versionsFrom(['METEOR@1.0']);
  
  api.use([
    'keplerjs:core'
  ]);

  api.addFiles([
    'plugin.js',
    'i18n/it.js'
  ]);

  api.addFiles([
  	'client/models/Place_streetview.js',
    'client/views/panels.html',
    'client/views/panels.js',
  ],'client');

  api.addFiles([
    'server/Googlemaps.js',
    'server/streetview.js',
  ],'server');

});