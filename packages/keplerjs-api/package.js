Package.describe({
  name: "keplerjs:api",
  summary: "Keplerjs API Rest",
  version: "1.2.1",
  git: "https://github.com/Keplerjs/Kepler.git"
});

Package.onUse(function (api) {
  
  api.versionsFrom(['METEOR@1.0']);
  
  api.use([
    'keplerjs:core@1.2.1',
    //TODO use https://github.com/kahmali/meteor-restivus
  ]);

  api.addFiles([
    'server/router.js',
  ],'server');

});