
//TODO https://github.com/jeromeetienne/microevent.js/blob/master/package.json

Package.describe({
	name: 'keplerjs:lib',
	summary: 'keplerjs 3rd party packages and libraries',
  version: "1.1.0",
  git: "https://github.com/Keplerjs/Kepler.git"
});
  
Npm.depends({
  "bootstrap-switch": "3.3.2",
  "bootstrap-list-filter": "0.3.2",
  "bootstrap-confirm-button": "0.2.2",
  "leaflet": "0.7.7",
  "leaflet-gps": "1.5.1",
  "leaflet-layerjson": "0.1.8",
  "leaflet.markercluster": "0.5.0"
});

Package.onUse(function(api) {

  api.versionsFrom("METEOR@1.0");

  //bootstrap plugins deps
  api.addFiles([
    '.npm/package/node_modules/bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.css',
    '.npm/package/node_modules/bootstrap-switch/dist/js/bootstrap-switch.js',
    '.npm/package/node_modules/bootstrap-list-filter/bootstrap-list-filter.src.js',
    '.npm/package/node_modules/bootstrap-confirm-button/bootstrap-confirm-button.src.js',
    //leaflet plugins deps
    '.npm/package/node_modules/leaflet/dist/leaflet-src.js',
    '.npm/package/node_modules/leaflet/dist/leaflet.css',
    '.npm/package/node_modules/leaflet-gps/dist/leaflet-gps.src.js',
    '.npm/package/node_modules/leaflet-gps/dist/leaflet-gps.src.css',
    '.npm/package/node_modules/leaflet-layerjson/dist/leaflet-layerjson.src.js',
    '.npm/package/node_modules/leaflet.markercluster/dist/MarkerCluster.Default.css',
    '.npm/package/node_modules/leaflet.markercluster/dist/MarkerCluster.css',
    '.npm/package/node_modules/leaflet.markercluster/dist/MarkerCluster.css',
    '.npm/package/node_modules/leaflet.markercluster/dist/leaflet.markercluster-src.js'
  ],'client');
  
  api.addAssets([
    '.npm/package/node_modules/leaflet/dist/images/marker-icon.png',
    '.npm/package/node_modules/leaflet/dist/images/marker-shadow.png',
    '.npm/package/node_modules/leaflet-gps/images/gps-icon.png',
  ],'client');

  var packages = [
    'meteor-platform@1.2.4',
    'reactive-var@1.0.7',
    'email@1.0.10',
    'matb33:collection-hooks@0.8.1',
    'underscorestring:underscore.string@3.2.0',
    'kidovate:bootstrap-slider@0.0.5',
    'iron:router@1.0.9',
    'mrt:modernizr-meteor@2.6.2',
    'twbs:bootstrap@3.3.6',
    'accounts-base@1.2.4',
    'accounts-password@1.1.6',
    'accounts-oauth@1.1.10',
    'accounts-facebook@1.0.7',
    'accounts-google@1.0.7',
    'accounts-twitter@1.0.7',
    'ian:accounts-ui-bootstrap-3@1.2.80'
  ];

  api.use(packages);
  api.imply(packages);

  api.addFiles([
    'lib/deepExtend.js',
    'lib/Class.js',
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
