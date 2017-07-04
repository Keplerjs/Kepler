Package.describe({
	name: 'keplerjs:core',
	version: '0.0.1',
	summary: 'keplerjs Meteor and 3rd party libraries',
	git: ''
});

Package.onUse(function(api) {

  var globsync = function(e){
    var pkg = 'keplerjs-core',
        path = Npm.require('path'),
        glob = Npm.require('glob');
    return glob.sync(e, {cwd: path.join(process.cwd(),'packages',pkg) });
  };

  api.versionsFrom("METEOR@1.0");
  
  var packages = [
    'keplerjs:lib',
    //TODO 'keplerjs:i18n'    
  ];

  api.use(packages);
  api.imply(packages);

  api.addFiles([
    'lib/Admin.js',
    'lib/Field.js',
    'lib/Schema.js',
    'lib/Util.js',
    'lib/Util_geo.js',
    'lib/Util_humanize.js',
    'lib/Util_valid.js',
    'lib/Cache.js',
    'lib/Plugin.js',
    'i18n/it.js'
  ], ['client', 'server']);

  api.addFiles(globsync('client/**/*.js'), ['client']);
  api.addFiles(globsync('server/**/*.js'), ['server']);

  api.export([
    'Kepler', 'K'
  ]);
  
});
