var version = '1.7.0';

Package.describe({
  version: version,
  name: 'keplerjs:core-ui',
  summary: 'keplerjs plugin base User Interface',
  git: "https://github.com/Keplerjs/Kepler.git"
});

Package.onUse(function(api) {
  api.use([
    'keplerjs:core@'+version,
  ]);

  api.versionsFrom("1.5.1");

  api.addFiles([
    'settings.js',
  ]);
  //array generated with:
  //  node -e "console.log(require('glob').sync('client/**/*.*'))"
  api.addFiles([
    'client/helpers.js',
    'client/home.html',
    'client/layouts.html',
    'client/layouts.js',
    'client/main.html',
    'client/stylesheets/header.css',
    'client/stylesheets/icons.css',
    'client/stylesheets/items.css',
    'client/stylesheets/lib/bootstrap.css',
    'client/stylesheets/lib/leaflet.css',
    'client/stylesheets/lib/sAlert.css',
    'client/stylesheets/login.css',
    'client/stylesheets/main.css',
    'client/stylesheets/markers.css',
    'client/stylesheets/panels/list.css',
    'client/stylesheets/panels/place.css',
    'client/stylesheets/panels/settings.css',
    'client/stylesheets/panels/user.css',
    'client/stylesheets/popups.css',
    'client/stylesheets/controls.css',
    'client/stylesheets/scrollbars.css',
    'client/stylesheets/sidebar.css',

    'client/views/btnConnect.html',
    'client/views/btnConnect.js',
    'client/views/errors.html',
    'client/views/footer.html',
    'client/views/footer.js',
    'client/views/formLogin.html',
    'client/views/formLogin.js',
    'client/views/loaders.html',
    'client/views/markers.html',
    'client/views/popups.html',
    'client/views/controls.html',
    'client/views/controls.js',
    'client/views/navSidebar.html',

    'client/views/items/place.html',
    'client/views/items/place.js',
    'client/views/items/user.html',

    'client/views/panels/friends.html',
    'client/views/panels/friends.js',
    'client/views/panels/panelList.html',
    'client/views/panels/panelList.js',

    'client/views/panels/place.html',
    'client/views/panels/place.js',
    'client/views/panels/place/info.html',
    'client/views/panels/place/hist.html',
    'client/views/panels/place/nearby.html',
    'client/views/panels/place/nearby.js',

    'client/views/panels/places.html',
    'client/views/panels/places.js',
    'client/views/panels/profile.html',
    'client/views/panels/search.html',
    'client/views/panels/search.js',
    'client/views/panels/settings.html',
    'client/views/tabLocation.html',

    'client/views/panels/user.html',
    'client/views/panels/user.js',
    'client/views/panels/user/friends.html',
    'client/views/panels/user/friends.js',
    'client/views/panels/user/histuser.html',

    'client/views/panels/settings/account.html',
    'client/views/panels/settings/bio.html',
    'client/views/panels/settings/bio.js',    
    'client/views/panels/settings/block.html',
    'client/views/panels/settings/block.js',
    'client/views/panels/settings/contact.html',
    'client/views/panels/settings/contact.js',    
    'client/views/panels/settings/lang.html',
    'client/views/panels/settings/lang.js',
    'client/views/panels/settings/map.html',
    'client/views/panels/settings/map.js',
    'client/views/panels/settings/version.html',

    'client/views/pluginsTemplate.html',
    'client/views/pluginsTemplate.js',
  ], 'client');

});
