
Package.describe({
  name: 'keplerjs:theme',
  summary: 'keplerjs plugin base Theme for UI',
  version: '0.0.1',
  git: ''
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
    'keplerjs:core'
  ]);

  api.addFiles([
    'plugin.js',
    'i18n/it.js',
    'i18n/en.js'
  ]);

  api.addFiles(globsync('client/**/*.*'), 'client');

  api.addAssets(globsync('assets/images/**/*.*'), 'client');
  
});
