
Package.describe({
	name: 'keplerjs:stats',
	summary: 'keplerjs plugin statistics data',
	version: "1.2.3",
	git: "https://github.com/Keplerjs/Kepler.git"
});

Npm.depends({
	'geostats': '1.5.0'
});

Package.onUse(function(api) {

  api.versionsFrom("1.5.1");

  api.use([
    'keplerjs:core@1.2.3'
  ]);

  api.addFiles([
    'plugin.js',
    'i18n/en.js'
  ]);

  api.addFiles([
  	'client/Map_stats.js',
  	'client/views/home.html',
  	'client/views/home.js'
  ],'client');

  api.addFiles([
  	'server/Stats.js',
    'server/places.js',
    'server/users.js'
  ],'server');

});
