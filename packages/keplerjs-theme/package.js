
Package.describe({
  name: 'keplerjs:theme',
  summary: 'keplerjs plugin base Theme for UI',
  version: "1.1.0",
  git: "https://github.com/Keplerjs/Kepler.git"
});

Package.onUse(function(api) {

  var globsync = function(e){
    var pkg = 'keplerjs-theme',
        path = Npm.require('path'),
        glob = Npm.require('glob');
    return glob.sync(e, {cwd: path.join(process.cwd(),'packages',pkg) });
  };

  api.versionsFrom("METEOR@1.0");

  api.use([
    'keplerjs:core@1.1.0',
  ]);

  api.addFiles([
    'plugin.js',
    'i18n/it.js',
    'i18n/en.js',
	'i18n/de.js'
  ]);

  api.addFiles(globsync('client/**/*.*'), 'client');

  api.addAssets(globsync('assets/images/**/*.*'), 'client');

});
