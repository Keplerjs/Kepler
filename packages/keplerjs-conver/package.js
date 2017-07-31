
Package.describe({
  name: 'keplerjs:conver',
  summary: 'keplerjs plugin conversations and messages',
  version: '0.0.1',
  git: ''
});

Package.onUse(function(api) {
  
  var globsync = function(e){
    var pkg = 'keplerjs-conver',
        path = Npm.require('path'),
        glob = Npm.require('glob');
    return glob.sync(e, {cwd: path.join(process.cwd(),'packages',pkg) });
  };

  api.versionsFrom("METEOR@1.0");
  
  api.use([
    'verron:autosize@3.0.8'
  ],'client');

  api.use([
    'keplerjs:core@0.0.1',
  ]);

  api.addFiles([
    'plugin.js',
    'i18n/it.js',
    'i18n/en.js'
  ]);

  api.addFiles(globsync('collections/**/*.js'));
  
  api.addFiles(globsync('client/**/*.*'), 'client');
  api.addFiles(globsync('server/**/*.js'),'server');

});
