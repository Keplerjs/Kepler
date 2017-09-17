
Package.describe({
  name: 'keplerjs:base',
  summary: 'keplerjs meta package to include base components',
  version: "1.2.2",
  git: "https://github.com/Keplerjs/Kepler.git"
});

Package.onUse(function(api) {

  api.versionsFrom("1.5.1");

  var packages = [
	'keplerjs:core@1.2.2',
	'keplerjs:ui@1.2.2',
	'keplerjs:theme@1.2.2',
	'keplerjs:edit@1.2.2',
  ];

  api.use(packages);
  api.imply(packages);

  api.export([
    'Kepler', 'K',
    'Places', 'Users'
  ]);
  
});
