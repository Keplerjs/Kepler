Package.describe({
  name: "keplerjs:api",
  summary: "Keplerjs API Rest",
  version: "1.2.3",
  git: "https://github.com/Keplerjs/Kepler.git"
});

Package.onUse(function (api) {
  
  api.versionsFrom("1.5.1");
  
  api.use([
    'keplerjs:core@1.2.3',
    //TODO use https://github.com/kahmali/meteor-restivus
  ]);

  api.addFiles([
    'server/router.js',
  ],'server');

});