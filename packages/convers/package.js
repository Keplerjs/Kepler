Package.describe({
  version: "1.4.0",
  name: 'keplerjs:convers',
  summary: 'keplerjs plugin conversations and messages',
  git: "https://github.com/Keplerjs/Kepler.git"
});

Package.onUse(function(api) {

  var globsync = function(e){
    var pkg = 'convers',
        path = Npm.require('path'),
        glob = Npm.require('glob');
    return glob.sync(e, {cwd: path.join(process.cwd(),'packages',pkg) });
  };

  api.versionsFrom("1.5.1");

  api.use([
    'verron:autosize@3.0.8'
  ],'client');

  api.use([
    'keplerjs:core',
  ]);

  api.addFiles([
    'plugin.js',
    'i18n/it.js',
    'i18n/en.js',
    'i18n/de.js',
    'i18n/es.js',
    'i18n/fr.js'
  ]);

  api.addFiles(globsync('collections/**/*.js'));

  api.addFiles(globsync('client/**/*.*'), 'client');
  api.addFiles(globsync('server/**/*.js'),'server');

});
