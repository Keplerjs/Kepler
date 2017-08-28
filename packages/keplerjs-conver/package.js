
Package.describe({
  name: 'keplerjs:conver',
  summary: 'keplerjs plugin conversations and messages',
  version: "1.2.1",
  git: "https://github.com/Keplerjs/Kepler.git"
});

Package.onUse(function(api) {

  var globsync = function(e){
    var pkg = 'keplerjs-conver',
        path = Npm.require('path'),
        glob = Npm.require('glob');
    return glob.sync(e, {cwd: path.join(process.cwd(),'packages',pkg) });
  };

  api.versionsFrom("1.5.1");

  api.use([
    'verron:autosize@3.0.8'
  ],'client');

  api.use([
    'keplerjs:core@1.2.1',
  ]);

  api.addFiles([
    'plugin.js',
    'i18n/it.js',
    'i18n/en.js',
	'i18n/de.js'
  ]);

  api.addFiles(globsync('collections/**/*.js'));

  api.addFiles(globsync('client/**/*.*'), 'client');
  api.addFiles(globsync('server/**/*.js'),'server');

});
