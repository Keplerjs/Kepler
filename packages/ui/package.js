
Package.describe({
  name: 'keplerjs:ui',
  summary: 'keplerjs plugin base User Interface',
  version: "1.2.5",
  git: "https://github.com/Keplerjs/Kepler.git"
});

Package.onUse(function(api) {
  
  var globsync = function(e){
    var pkg = 'ui',
        path = Npm.require('path'),
        glob = Npm.require('glob');
    return glob.sync(e, {cwd: path.join(process.cwd(),'packages',pkg) });
  };

  api.versionsFrom("1.5.1");
  
  api.use([
    'keplerjs:core',
  ]);

  api.addFiles(globsync('client/**/*.*'), 'client');

});
