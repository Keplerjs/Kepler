var version = '1.7.0';

Package.describe({
  version: version,
  name: 'keplerjs:stats',
	summary: 'keplerjs plugin statistics data',
	git: "https://github.com/Keplerjs/Kepler.git"
});

Npm.depends({
	'geostats': '1.5.0'
});

Package.onUse(function(api) {
  api.use([
    'keplerjs:core@'+version,
    'keplerjs:api@'+version,
    'keplerjs:geoinfo@'+version
  ]);

  api.versionsFrom("1.5.1");

  api.addFiles([
    'plugin.js',
    'i18n/en.js'
  ]);

  api.addFiles([
  	'client/Map_stats.js',
  ],'client');

  api.addFiles([
    'server/admin.js',
  	'server/Stats.js',
    'server/api.js',
    'server/places.js',
    'server/users.js',
    'server/convers.js',
  ],'server');

});
