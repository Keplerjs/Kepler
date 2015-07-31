Package.describe({
  name: 'stefcud:keplerjs',
  version: '0.0.1',
  summary: 'Kepler is an open-source, real-time geosocial network app built with Meteor and Leaflet',
  git: 'git@github.com:Keplerjs/Kepler.git',
  documentation: 'README.md'
});

Npm.depends({
  'winston':'1.0.0'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1');
  api.use('underscore');
  api.addFiles('client/api.js', 'client');
  api.addFiles('server/api.js', 'server');
  api.export('Logger');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('mstn:logger');
  api.addFiles('tests/test-client.js', 'client');
});