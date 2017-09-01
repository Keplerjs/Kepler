
Package.describe({
  name: 'keplerjs:stats',
  summary: 'keplerjs plugin statistics data',
  version: "1.2.1",
  git: "https://github.com/Keplerjs/Kepler.git"
});

Package.onUse(function(api) {

  api.versionsFrom("1.5.1");

  api.use([
    'keplerjs:core@1.2.1'
  ]);

  api.addFiles([
    'plugin.js',	
  ]);

  api.addFiles([
    'server/places.js'
  ],'server');

});
