
Package.describe({
  name: 'keplerjs:ui',
  summary: 'keplerjs plugin base User Interface',
  version: '0.0.1',
  git: ''
});

Package.onUse(function(api) {
  
  var globsync = function(e){
    var pkg = 'keplerjs-ui',
        path = Npm.require('path'),
        glob = Npm.require('glob');
    return glob.sync(e, {cwd: path.join(process.cwd(),'packages',pkg) });
  };

  api.versionsFrom("METEOR@1.0");
  
  api.use([
    'keplerjs:core@0.0.1',
  ]);

  api.addFiles(globsync('client/**/*.*'), 'client');
  
});
