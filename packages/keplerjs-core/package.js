Package.describe({
	name: 'keplerjs:core',
	summary: 'keplerjs Meteor and 3rd party libraries',
  version: '1.1.0',  
  git: "https://github.com/Keplerjs/Kepler.git"
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
    'keplerjs:lib@1.1.0',
    'keplerjs:i18n@1.1.0'
  ];

  api.use(packages);
  api.imply(packages);

  api.addFiles(['Kepler.js','settings.js']);
  api.addFiles(globsync('i18n/**/*.js'));  
  api.addFiles(globsync('lib/**/*.js'));
  api.addFiles(globsync('modules/**/*.js'));
  api.addFiles(globsync('collections/**/*.js'));

  api.addFiles(globsync('client/**/*.*'),  'client');
  api.addFiles(globsync('server/**/*.js'), 'server');

  api.export([
    'Kepler', 'K',
    'Places','Users'
  ]);
  
});
