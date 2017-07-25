
Package.describe({
  name: 'keplerjs:weather',
  summary: 'keplerjs plugin weather',
  version: '0.0.1',
  git: ''
});

Package.onUse(function(api) {

  api.versionsFrom("METEOR@1.0");
  
  api.use([
    'keplerjs:core'
  ]);
  
  api.use([
    'http',
    //'robodo:async',
  ],'server');

  api.addFiles([
    'plugin.js',
    'i18n/it.js'
  ]);

  api.addFiles([
    'client/models/Place_weather.js',
    'client/views/panels.html',
    'client/views/panels.js',
    'client/stylesheets/panels/weather.css',
  ],'client');

  api.addAssets('assets/images/weather.png', 'client');

  api.addFiles([
    'server/weather.js',
  ],'server');

});
