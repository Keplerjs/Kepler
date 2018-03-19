
Package.describe({
  name: 'keplerjs:base',
  summary: 'keplerjs meta package to include base components',
  version: "1.2.5",
  git: "https://github.com/Keplerjs/Kepler.git"
});

Package.onUse(function(api) {

  api.versionsFrom("1.5.1");

  var packages = [
    'keplerjs:ui',
    'keplerjs:core',
  ];

  api.use(packages);
  api.imply(packages);

  api.export([
    'Kepler', 'K',
    'Places', 'Users'
  ]);
  
});
