
Package.describe({
  name: 'keplerjs:ui',
  summary: 'keplerjs plugin base User Interface',
  version: "1.1.0",
  git: "https://github.com/Keplerjs/Kepler.git"
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
    'keplerjs:core@1.1.0',
  ]);

  api.addFiles(globsync('client/**/*.*'), 'client');
  
});
