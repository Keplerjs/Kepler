var version = '1.6.6';

Package.describe({
  version: version,
  name: 'keplerjs:edit',
  summary: 'keplerjs plugin for edit place informations',
  git: "https://github.com/Keplerjs/Kepler.git"
});

Npm.depends({
  'typeahead.js': '0.11.1',
  //TODO 'bootstrap-3-typeahead': '3.1.1'
});

Package.onUse(function(api) {
  api.use([
    'keplerjs:core@'+version,
  ]);

  api.versionsFrom("1.5.1");
  
  api.addFiles([
    '.npm/package/node_modules/typeahead.js/dist/typeahead.bundle.js',
    //TODO '.npm/package/node_modules/bootstrap-3-typeahead/bootstrap3-typeahead.js'
  ],'client');

  api.addFiles([
    'plugin.js',
    'i18n/it.js',
    'i18n/en.js',
    'i18n/de.js',
    'i18n/es.js',
    'i18n/fr.js',
  ]);

  api.addFiles([
    //'client/lib/L.Marker.drag.js',
    'client/Place_edit.js',
    'client/User_edit.js',
    'client/views/panels.html',
    'client/views/panels.js',
    'client/views/popups.html',
    'client/views/popups.js',
    'client/views/items.html',
    'client/views/items.js',
    'client/Router.js',
    'client/stylesheets/markers.css',
    'client/stylesheets/panels.css',
  ],'client');

  api.addFiles([
    'server/places.js'
  ],'server');

});
