
//TODO https://github.com/jeromeetienne/microevent.js/blob/master/package.json

Package.describe({
	name: 'keplerjs:lib',
	summary: 'keplerjs 3rd party packages and libraries',
  version: "1.2.1",
  git: "https://github.com/Keplerjs/Kepler.git"
});
  
Npm.depends({
  "bootstrap-switch": "3.3.2",
  "bootstrap-list-filter": "0.3.2",
  "bootstrap-confirm-button": "0.2.2",
  "leaflet": "1.2.0",
  "leaflet-gps": "1.7.0",
  "leaflet-layerjson": "0.2.5",
  "leaflet.markercluster": "1.0.6",
});

Package.onUse(function(api) {

  api.versionsFrom("1.5.1");

  //bootstrap plugins deps
  api.addFiles([
    '.npm/package/node_modules/bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.css',
    '.npm/package/node_modules/bootstrap-switch/dist/js/bootstrap-switch.js',
    '.npm/package/node_modules/bootstrap-list-filter/bootstrap-list-filter.src.js',
    '.npm/package/node_modules/bootstrap-confirm-button/bootstrap-confirm-button.src.js',
    //leaflet plugins deps
    '.npm/package/node_modules/leaflet/dist/leaflet-src.js',
    '.npm/package/node_modules/leaflet/dist/leaflet.css',
    '.npm/package/node_modules/leaflet-gps/dist/leaflet-gps.src.css',    
    '.npm/package/node_modules/leaflet-gps/dist/leaflet-gps.src.js',
    '.npm/package/node_modules/leaflet-layerjson/dist/leaflet-layerjson.src.js',
    '.npm/package/node_modules/leaflet.markercluster/dist/MarkerCluster.css',
    '.npm/package/node_modules/leaflet.markercluster/dist/MarkerCluster.Default.css',
    '.npm/package/node_modules/leaflet.markercluster/dist/leaflet.markercluster-src.js'
  ],'client');
  
  api.addAssets([
    '.npm/package/node_modules/leaflet/dist/images/marker-icon.png',
    '.npm/package/node_modules/leaflet/dist/images/marker-shadow.png',
    '.npm/package/node_modules/leaflet-gps/images/gps-icon.png',
  ],'client');

  var packages = [
    'meteor-base',
    'mongo',
    'reactive-var',
    'session',
    'tracker',
    'check',
	'standard-minifier-css',
	'standard-minifier-js',
	'dynamic-import',
    'email',
    'http',
    'service-configuration',
    'accounts-base',
    'accounts-password',
    'accounts-oauth',
    'accounts-facebook',
    'accounts-google',
    'accounts-twitter',


	'blaze-html-templates@1.1.2',
    'matb33:collection-hooks@0.8.4',
    'underscorestring:underscore.string@3.3.4',
    'kidovate:bootstrap-slider@0.0.5',
    'iron:router@1.1.2',
    'mrt:modernizr-meteor@2.6.2',
    'twbs:bootstrap@3.3.6',
    'ian:accounts-ui-bootstrap-3@1.2.89',
    //'accounts-ui',
    'mstn:accounts-openstreetmap@0.1.0',
  ];

  api.use(packages);
  api.imply(packages);

  api.addFiles([
    'lib/deepExtend.js',
    'lib/Class.js',
    'config/Accounts.js',
    'config/underscore.js',
    'config/leaflet.js',
  ]);
  
  api.addFiles([
    'client/L.NodeIcon.js',
    'client/L.Cursor.js'    
  ], ['client']);

  api.export([
    'Class',
    'deepExtend'
  ]);
  
});
