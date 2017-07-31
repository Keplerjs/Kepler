Package.describe({
  name: "keplerjs:api",
  summary: "Keplerjs API Rest",
  version: "1.0.0"
});

Package.onUse(function (api) {
  
  api.versionsFrom(['METEOR@1.0']);
  
  api.use([
    'keplerjs:core@0.0.1',
    //TODO use https://github.com/kahmali/meteor-restivus
  ]);

  api.addFiles([
    'server/router.js',
  ],'server');

});