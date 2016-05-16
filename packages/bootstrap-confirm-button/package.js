Package.describe({
  name: "keplerjs:bootstrap-confirm-button",
  summary: "Keplerjs bootstrap confirm button",
  version: "1.0.0"
});

Npm.depends({
  "bootstrap-confirm-button": "0.0.4"
});

Package.onUse(function (api) {
  api.versionsFrom(['METEOR@1.0']);
  api.addFiles([
    '.npm/package/node_modules/bootstrap-confirm-button/bootstrap-confirm-button.src.js'
  ],'client');
});