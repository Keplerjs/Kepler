Package.describe({
	name: 'keplerjs:core',
	summary: "keplerjs Meteor and 3rd party libraries",
	version: "1.3.0",  
	git: "https://github.com/Keplerjs/Kepler.git"
});

Package.onUse(function(api) {

  var globsync = function(e){
    var pkg = 'core',
        path = Npm.require('path'),
        glob = Npm.require('glob');
    return glob.sync(e, {cwd: path.join(process.cwd(),'packages',pkg) });
  };

  api.versionsFrom("1.5.1");
  
  var packages = [
    'keplerjs:lib',
    'keplerjs:i18n'
  ];

  api.use(packages);
  api.imply(packages);

  api.addFiles([
    'Kepler.js',
    'settings.js',
    'modules/Util.js',
    'modules/Util_geo.js',
    'modules/Util_humanize.js',
    'modules/Util_sanitize.js',
    'modules/Util_valid.js',  	
    'modules/Cache.js',
    'modules/Plugin.js',
    'modules/schemas.js',
    'modules/filters.js',
    'modules/templates.js',
  ]);
  
  api.addFiles(globsync('collections/**/*.js'));

  api.addFiles([
    'client/Accounts.js',
    'client/Map.js',
    'client/Map_controls.js',
    'client/Map_layers.js',
    'client/Profile.js',	
    'client/Place.js',
    'client/User.js',
    'client/Router.js',
  ], 'client');

  api.addFiles(globsync('server/**/*.js'), 'server');

  api.export([
    'Kepler', 'K',
    'Places', 'Users'
  ]);

});
