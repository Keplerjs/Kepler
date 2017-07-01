
Package.describe({
  name: 'keplerjs:weather',
  summary: 'keplerjs plugin weather',
  version: '0.0.1',
  git: ''
});

Package.onUse(function(api) {

  api.versionsFrom("METEOR@1.0");
  
  api.use([
    'keplerjs:lib'
  ]);

/*  api.addFiles([
    'lib/weather.js'
  ], ['client', 'server']);
*/
});
