Package.describe({
  name: 'mstn:accounts-openstreetmap',
  summary: "Login service for OpenStreetMap accounts",
  version: "0.1.0"
});

Package.onUse(function(api) {
  
  //api.versionsFrom('1.5.1');
  api.versionsFrom("METEOR@1.0");

  api.use('accounts-base', ['client', 'server']);
  
  api.imply('accounts-base', ['client', 'server']);
  api.use('accounts-oauth', ['client', 'server']);
  api.use('mstn:openstreetmap-oauth@0.0.1');
  api.imply('mstn:openstreetmap-oauth');
  
  api.addFiles("accounts-osm.js");
  
});
