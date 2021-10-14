var version = '1.7.0';

Package.describe({
  version: version,
	name: 'keplerjs:lib',
	summary: 'keplerjs 3rd party packages and libraries',
  git: "https://github.com/Keplerjs/Kepler.git"
});

Npm.depends({
  "autosize": "4.0.2",
  "latinize": "0.4.0",
  //"normalize-url": "4.3.0",
  "bootstrap-switch": "3.3.2",
  "bootstrap-list-filter": "0.3.3",
  "bootstrap-confirm-button": "0.3.2",
  "leaflet": "1.3.4",
  "leaflet-gps": "1.7.6",
  "leaflet-layerjson": "0.3.3",
  "leaflet.markercluster": "1.4.1",
  "leaflet-fullscreen": "1.0.2"
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
    //
    '.npm/package/node_modules/leaflet.markercluster/dist/MarkerCluster.css',
    '.npm/package/node_modules/leaflet.markercluster/dist/MarkerCluster.Default.css',
    '.npm/package/node_modules/leaflet.markercluster/dist/leaflet.markercluster-src.js',
    '.npm/package/node_modules/leaflet-fullscreen/dist/Leaflet.fullscreen.js',
    '.npm/package/node_modules/leaflet-fullscreen/dist/leaflet.fullscreen.css'
  ],'client');

  api.addAssets([
    '.npm/package/node_modules/leaflet/dist/images/marker-icon.png',
    '.npm/package/node_modules/leaflet/dist/images/marker-shadow.png',
    '.npm/package/node_modules/leaflet-gps/images/gps-icon.png',
    '.npm/package/node_modules/leaflet-fullscreen/dist/fullscreen.png',
  ],'client');

  var packages = [
    'meteor-base',
    'underscore',
    'mongo',
    'reactive-var',
    'reactive-dict',
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
    'accounts-ui',

    'accounts-oauth',
    'accounts-facebook',
    'accounts-google',
    'accounts-github',
    //'accounts-twitter',
    //
    'bozhao:accounts-instagram@0.2.2',
    'blaze-html-templates@1.1.2',
    //'matb33:collection-hooks@0.8.4',
    //'matb33:collection-hooks@1.0.1',
    'matb33:collection-hooks@1.1.0',
    'underscorestring:underscore.string@3.3.4',

    'kidovate:bootstrap-slider@0.0.5',
    //TODO use npm

    'iron:router@1.1.2',
    'reywood:iron-router-ga@2.0.1',
    'twbs:bootstrap@3.3.6',
    //TODO https://github.com/bogdanlungu/meteor-accounts-ui-bootstrap-4
    'mstn:accounts-openstreetmap@0.2.0',

    'nooitaf:colors@1.1.2_1',	//https://www.npmjs.com/package/colors
    'konecty:user-presence@2.4.0',
    'juliancwirko:s-alert@3.2.0',
    'ostrio:iron-router-helper-class@1.0.1',
    'ostrio:iron-router-meta@1.1.0',
    'ostrio:iron-router-title@1.0.3',
  ];

  api.use(packages);
  api.imply(packages);

  api.addFiles([
    'lib/deepExtend.js',
    'lib/Class.js',
    '.npm/package/node_modules/latinize/latinize.js',
    '.npm/package/node_modules/autosize/dist/autosize.js',
    //'.npm/package/node_modules/normalize-url/index.js',
    'lib/Autosize.js',
    'lib/Latinize.js',
    'config/leaflet.js',
    'config/Router.js',
    'config/underscore.js',
    //'config/sAlert.js',
    'config/UserPresence.js'
  ]);

  api.addFiles([
    'client/L.NodeIcon.js',
    'client/L.Cursor.js',
  ], 'client');

  api.export([
    'Class',
    'deepExtend',
    'Autosize',
    'Latinize',
    'sAlert',
  ]);

});
