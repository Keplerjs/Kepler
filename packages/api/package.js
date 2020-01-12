var version = '1.7.0';

Package.describe({
  version: version,
  name: "keplerjs:api",
  summary: "Keplerjs API Rest",
  git: "https://github.com/Keplerjs/Kepler.git"
});

Package.onUse(function (api) {
  api.use([
    'keplerjs:core@'+version,
  ]);
  
  api.versionsFrom("1.5.1");
  
  api.addFiles([
    'plugin.js',
  ]);

  api.addFiles([
    'server/Router.js',
  ],'server');

});