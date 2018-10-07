Package.describe({
  version: "1.3.7",
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
    'server/router.js',
  ],'server');

});