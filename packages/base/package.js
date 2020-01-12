var version = '1.7.0';

Package.describe({
  version: version,
  name: 'keplerjs:base',
  summary: 'keplerjs meta package to include base components',
  git: "https://github.com/Keplerjs/Kepler.git"
});

Package.onUse(function(api) {
  var packages = [
    'keplerjs:core@'+version,
    'keplerjs:core-ui@'+version
  ];
  
  api.use(packages);

  api.versionsFrom("1.5.1");

  api.imply(packages);

  api.export([
    'Kepler', 'K',
    'Places', 'Users'
  ]);
  
});
