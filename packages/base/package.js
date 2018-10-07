Package.describe({
  version: "1.3.7",
  name: 'keplerjs:base',
  summary: 'keplerjs meta package to include base components',
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
