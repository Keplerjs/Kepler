
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

  api.addFiles([
    'client/models/Place_weather.js',
    'client/views/panels/place/weather.html',
    'client/views/panels/place/weather.js',
    'client/stylesheets/panels/weather.css',
  ],'client');

  api.addFiles([
    'server/weather.js',
  ],'server');


  api.addFiles([
    'startup.js',
  ],['client','server']);

});
