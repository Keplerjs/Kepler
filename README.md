![KeplerJs](./keplerjs.png) 

## KeplerJS

The full-stack real-time geo-social network framework
lets users share favorite places and join discussions

## Links

* [Github](https://github.com/Keplerjs)
* [NPM](https://www.npmjs.com/org/keplerjs)
* [Atmospherejs](https://atmospherejs.com/keplerjs)

### Install

Prerequisites:

* [Meteor](https://www.meteor.com/install)

```sh
meteor start
```

And open http://localhost:3000/ in your browser.

#### Settings
Default settings file: *private/settings.sample.json*
Special configurations of individual plugins can be overridden.
To see *packages/plugin-dir/plugin.js* file in the *settings* section.

```sh
meteor --settings settings.sample.json 
```

### Architecture

Kepler uses a [package-based architecture](http://experimentsinmeteor.com/package-based-architecture/), meaning that the entirety of its codebase resides in */packages*
Different packages can play different behaviors. So here's a quick overview of the different package categories you'll come across. 

#### Core Packages

* keplerjs:lib
* keplerjs:i18n
* keplerjs:core
* keplerjs:ui
* keplerjs:api

**keplerjs:core** contains the heart of Kepler, and itself depends on a set of core packages: *keplerjs:lib*, *keplerjs:i18n*

**keplerjs:ui** define the base front-end structure of Kepler app, the basic views and the minimum CSS for the html interface.

**keplerjs:api** implement a simple RESTful API for basic operations and it is reachable to this url */api*.


#### Plugin Packages

These plugin packages provide additional features for your Kepler app.
A plugin to work and to be defined as a rule to contain a file *plugin.js* that defines the behavior and configuration in the kepler environment.
A plugin only need to make your own package depend on *keplerjs:core* or others plugins if needed.

#### Core Plugins

* keplerjs:theme
* keplerjs:upload
* keplerjs:notif
* keplerjs:categories
* keplerjs:share
* keplerjs:conver
* keplerjs:events
* keplerjs:geoinfo
* keplerjs:weather
* keplerjs:pois
* keplerjs:tracks
* keplerjs:googlemaps
* keplerjs:osm

####  3rd party Plugins Packages

*Are expected to be developed by the great community of Meteor developers...*


#### keplerjs:core


```
├── client
│   ├── Accounts.js
│   ├── Map.js
│   ├── Place.js
│   ├── Profile.js
│   ├── router.js
│   └── User.js
│
├── collections
│   ├── queries
│   │   ├── places.js
│   │   └── users.js
│   │
│   ├── places.js
│   └── users.js
│
├── modules
│   ├── Admin.js
│   ├── Cache.js
│   ├── filters.js
│   ├── placeholders.js
│   ├── Plugin.js
│   ├── schemas.js
│   ├── settings.js
│   ├── Util_geo.js
│   ├── Util_humanize.js
│   ├── Util.js
│   └── Util_valid.js
│
├── server
│   ├── pubs
│   │   ├── places.js
│   │   ├── profile.js
│   │   └── users.js
│   │
│   ├── Accounts.js
│   ├── places.js
│   └── profile.js
│
├── Kepler.js
└── package.js
```

#### keplerjs:ui
```
├── client
│   ├── stylesheets
│   │   ├── panels
│   │   │   ├── list.css
│   │   │   ├── place.css
│   │   │   ├── settings.css
│   │   │   └── user.css
│   │   │
│   │   ├── header.css
│   │   ├── icons.css
│   │   ├── items.css
│   │   ├── login.css
│   │   ├── main.css
│   │   ├── markers.css
│   │   ├── popups.css
│   │   ├── scrollbars.css
│   │   └── sidebar.css
│   │
│   ├── views
│   │   ├── items
│   │   │   ├── place.html
│   │   │   ├── place.js
│   │   │   └── user.html
│   │   │
│   │   ├── panels
│   │   │   ├── place
│   │   │   │   ├── histplace.html
│   │   │   │   └── info.html
│   │   │   │   
│   │   │   ├── user
│   │   │   │   ├── bio.html
│   │   │   │   ├── favorites.html
│   │   │   │   ├── friends.html
│   │   │   │   ├── friends.js
│   │   │   │   └── histuser.html
│   │   │   │  
│   │   │   ├── friends.html
│   │   │   ├── friends.js
│   │   │   ├── location.html
│   │   │   ├── panelList.html
│   │   │   ├── panelList.js
│   │   │   ├── place.html
│   │   │   ├── place.js
│   │   │   ├── places.html
│   │   │   ├── places.js
│   │   │   ├── profile.html
│   │   │   ├── settings.html
│   │   │   ├── settings.js
│   │   │   ├── user.html
│   │   │   └── user.js
│   │   │
│   │   ├── btnConnect.html
│   │   ├── btnConnect.js
│   │   ├── errors.html
│   │   ├── footer.html
│   │   ├── formLogin.html
│   │   ├── header.html
│   │   ├── loaders.html
│   │   ├── pluginPlaceholder.html
│   │   ├── pluginPlaceholder.js
│   │   ├── popups.html
│   │   └── sidebarNav.html
│   │
│   ├── helpers.js
│   ├── home.html
│   ├── layouts.html
│   └── main.html
└── package.js
```

### License
Note that Kepler is distributed under the [MIT License](http://opensource.org/licenses/MIT)