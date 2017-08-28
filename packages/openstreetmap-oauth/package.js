Package.describe({
  name: 'mstn:openstreetmap-oauth',
  version: '0.0.1',
  summary: 'OpenStreetMap OAuth flow',
  git: 'https://github.com/mstn/openstreetmap-oauth',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  
  //api.versionsFrom('1.5.1');
  api.versionsFrom("METEOR@1.0");

  api.use('ecmascript');
  api.use('random');
  api.use('oauth1', ['client', 'server']);
  api.use('oauth', ['client', 'server']);
  api.use('service-configuration', ['client', 'server']);
  api.mainModule('osm-oauth.client.js', 'client');
  api.mainModule('osm-oauth.server.js', 'server');
  api.export('OpenStreetMap', 'client');
});

