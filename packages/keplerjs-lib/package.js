Package.describe({
	name: 'keplerjs:lib',
	version: '0.0.1',
	summary: 'keplerjs 3rd party packages and libraries',
	git: ''
});
  
Npm.depends({
  "bootstrap-switch": "3.3.2",
  "bootstrap-list-filter": "0.3.2",
  "bootstrap-confirm-button": "0.1.0",
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
    '.npm/package/node_modules/bootstrap-confirm-button/bootstrap-confirm-button.src.js'    
  ],'client');

  //leaflet plugins deps
  api.addFiles([
    '.npm/package/node_modules/leaflet/dist/leaflet-src.js',
    '.npm/package/node_modules/leaflet/dist/leaflet.css',
    '.npm/package/node_modules/leaflet-gps/dist/leaflet-gps.src.js',
    '.npm/package/node_modules/leaflet-gps/dist/leaflet-gps.src.css',
    '.npm/package/node_modules/leaflet-layerjson/dist/leaflet-layerjson.src.js',
    '.npm/package/node_modules/leaflet.markercluster/dist/MarkerCluster.Default.css',
    '.npm/package/node_modules/leaflet.markercluster/dist/MarkerCluster.css',
    '.npm/package/node_modules/leaflet.markercluster/dist/leaflet.markercluster-src.js'
  ],'client');

/* //TODO
  api.addAssets([
    '.npm/package/node_modules/leaflet/dist/images/marker-icon.png',
    '.npm/package/node_modules/leaflet/dist/images/marker-shadow.png',
  ],'client');*/

  var packages = [
    'meteor-platform',
    'reactive-var',
    'matb33:collection-hooks',
    'underscorestring:underscore.string',
    'kidovate:bootstrap-slider',
    'anti:i18n',
    'iron:router',
    'mrt:modernizr-meteor',
    'twbs:bootstrap',
    'ian:accounts-ui-bootstrap-3'
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
    'client/L.Marker.drag.js',
    'client/L.Cursor.js'    
  ], ['client']);

  api.export([
    'Class','deepExtend'
  ]);
  
});
