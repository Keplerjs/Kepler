Package.describe({
  name: "keplerjs:bootstrap-list-filter",
  summary: "Keplerjs bootstrap list filter",
  version: "1.0.0"
});

Npm.depends({
  "bootstrap-list-filter": "0.3.0"
});

Package.onUse(function (api) {
  api.versionsFrom(['METEOR@1.0']);
  api.addFiles([
    '.npm/package/node_modules/bootstrap-list-filter/bootstrap-list-filter.src.js'
  ],'client');
});