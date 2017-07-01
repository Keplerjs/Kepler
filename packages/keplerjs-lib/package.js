Package.describe({
	name: 'keplerjs:lib',
	version: '0.0.1',
	summary: 'keplerjs core libraries',
	git: ''
});

Package.onUse(function(api) {

  api.versionsFrom("METEOR@1.0");
  
/*  Npm.depends({
    'imagemagick': '1.3.1',
  });*/

  var packages = [
    'meteor-platform',
    'twbs:bootstrap',
    'anti:i18n',    
    'ian:accounts-ui-bootstrap-3',
    'underscorestring:underscore.string'
  ];

  api.use(packages);
  //api.imply(packages);

  api.addFiles([
    'lib/config/Accounts.js',
    'lib/config/i18n.js',
    'lib/config/leaflet.js',
    'lib/config/underscore.js',
    'lib/i18n/it.js',
    'lib/Kepler.js',
    'lib/schemas.js',
    'lib/fields.js',
    'lib/util.js',
    'lib/util_geo.js',
    'lib/util_humanize.js',
    'lib/util_valid.js',
    'lib/cache.js',
    'lib/admin.js'
  ], ['client', 'server']);

  api.export([
    'Kepler', 'K'
  ]);
  
});
