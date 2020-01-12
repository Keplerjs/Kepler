var version = '1.7.0';

Package.describe({
  version: version,
  name: 'keplerjs:categories',
  summary: 'keplerjs places and users categorization',
  git: "https://github.com/Keplerjs/Kepler.git"
});

Npm.depends({
  //moved in kepler plugin edit 'typeahead.js': '0.11.1',
  'bootstrap-tagsinput':'0.7.1'//require typeahead.js
});

Package.onUse(function(api) {
  var packages = [
    'keplerjs:core@'+version,
    'keplerjs:edit@'+version,
  ];

  api.versionsFrom("1.5.1");

  api.use(packages);
  api.imply(packages);

  api.addFiles([
    //moved in kepler plugin edit '.npm/package/node_modules/typeahead.js/dist/typeahead.bundle.js',
    '.npm/package/node_modules/bootstrap-tagsinput/dist/bootstrap-tagsinput.css',
    '.npm/package/node_modules/bootstrap-tagsinput/dist/bootstrap-tagsinput.js',
  ],'client');

  api.addFiles([
    'modules/Util_sanitize.js'
  ]);

  api.addFiles([
    'plugin.js',
    'i18n/it.js',
    'i18n/en.js',
    'i18n/de.js',
    'i18n/es.js',
    'i18n/fr.js',
    'i18n/sv.js',
    'collections/places.js',
    'collections/users.js',
    'collections/cats.js',
  ]);

  api.addFiles([
    'client/Cats.js',    
    'client/Router.js',
    'client/Place_cats.js',
    'client/User_cats.js',
	  'client/stylesheets/main.css', 
    'client/stylesheets/panels.css',  
    'client/views/panels/edit.html',
    'client/views/panels/edit.js',
    'client/views/panels/place.html',
    'client/views/panels/place.js',
    'client/views/pages/admin.html',
    'client/views/pages/admin.js',  
    'client/views/panels/user.html',
    'client/views/panels/settings.html',
    'client/views/panels/settings.js', 
    'client/views/panels/admin.html',
    'client/views/panels/admin.js',
    'client/views/panels/cats.html',
  ],'client');

  api.addFiles([
    'server/admin.js',
    'server/users.js',
    'server/places.js',
    'server/cats.js',
    'server/settings.js'
  ],'server');

  api.export([
    'Categories'
  ]);

});
