var version = '1.7.0';

Package.describe({
  version: version,
  name: 'keplerjs:core',
	summary: "keplerjs Meteor and 3rd party libraries",
	git: "https://github.com/Keplerjs/Kepler.git"
});

Package.onUse(function(api) {
  var packages = [
    'keplerjs:lib@'+version,
    'keplerjs:i18n@'+version
  ];

  api.versionsFrom("1.5.1");

  api.use(packages);
  api.imply(packages);

  api.addFiles([
    'Kepler.js',
    'settings.js',
    
    'config/Alert.js',
    'config/Accounts.js',
    'config/Router.js',
    'config/settings.js',

    'modules/Util.js',
    'modules/Util_geo.js',
    'modules/Util_humanize.js',
    'modules/Util_sanitize.js',
    'modules/Util_valid.js',  	
    'modules/Cache.js',
    'modules/Plugin.js',
    'modules/schemas.js',
    'modules/queries.js',
    'modules/filters.js',
    'modules/templates.js',
  ]);
  
  api.addFiles([
    'collections/places.js',
    'collections/queries/places.js',
    'collections/queries/users.js',
    'collections/users.js'
  ]);

  api.addFiles([
    'client/Alert.js',
    'client/Map.js',
    'client/Map_controls.js',
    'client/Map_layers.js',
    'client/Profile.js',	
    'client/Place.js',
    'client/User.js',
    'client/Router.js',
  ], 'client');

  api.addFiles([
    'server/Accounts.js',
    'server/profile.js',
    'server/queries.js',
    'server/pubs/places.js',
    'server/pubs/profile.js',
    'server/pubs/users.js'
  ], 'server');

  api.export([
    'Kepler', 'K', 'M',
    'Places', 'Users'
  ]);

});
