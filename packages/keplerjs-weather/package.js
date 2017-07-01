
Package.describe({
  name: "keplerjs:weather",
  summary: "keplerjs plugin weather",
  version: "0.1",
  //git: "https://github.com/TelescopeJS/Telescope.git"
});

Package.onUse(function(api) {

  api.versionsFrom("METEOR@1.0");
  
  api.use([
    //'nova:lib@0.26.0-nova'
  ]);

  api.addFiles([
    'lib/weather.js'
  ], ['client', 'server']);

  api.addFiles([
    // 'lib/client/analytics.js'
  ], ['client']);

/*  api.export([
    'Events'
  ]);*/
});
