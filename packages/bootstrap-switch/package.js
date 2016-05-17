Package.describe({
  name: "keplerjs:bootstrap-switch",
  summary: "Keplerjs bootstrap switch",
  version: "1.0.0"
});

Npm.depends({
  "bootstrap-switch": "3.3.2"
});

Package.onUse(function (api) {
  api.versionsFrom(['METEOR@1.0']);
  api.addFiles([
    '.npm/package/node_modules/bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.css',
    '.npm/package/node_modules/bootstrap-switch/dist/js/bootstrap-switch.js'
  ],'client');
});