Package.describe({
  version: "1.4.0",
  name: "keplerjs:api",
  summary: "Keplerjs API Rest",
  git: "https://github.com/Keplerjs/Kepler.git"
});

Package.onUse(function (api) {
  
  api.versionsFrom("1.5.1");
  
  api.use([
    'keplerjs:core',
    //TODO use https://github.com/kahmali/meteor-restivus
  ]);
  
  api.addFiles([
    'plugin.js',
  ]);

  api.addFiles([
    'server/router.js',
  ],'server');

});