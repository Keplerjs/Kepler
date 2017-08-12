![KeplerJs](keplerjs.png) 

# KeplerJS

The full-stack real-time geo-social network framework
lets users share favorite places and join discussions

*[Official DEMO](https://keplerjs.herokuapp.com/)* deployed on **Heroku**


* Source code: [Github](https://github.com/Keplerjs)
* Meteor packages: [Atmospherejs](https://atmospherejs.com/keplerjs)
* Npm packages: [NPM](https://www.npmjs.com/org/keplerjs)
* Roadmap: [Trello](https://trello.com/b/FBK72QEJ/keplerjs-roadmap), [Waffle](https://waffle.io/Keplerjs/Kepler)
* News: [Twitter](https://twitter.com/Kepler_JS), [Tumblr](https://keplerjs.tumblr.com/)

### Install

```sh
npm i
npm start
```

And open http://localhost:3000/ in your browser.

## Architecture

Kepler uses a [package-based architecture](http://experimentsinmeteor.com/package-based-architecture/), meaning that the entirety of its codebase resides in */packages*
Different packages can play different behaviors. So here's a quick overview of the different package categories you'll come across. 

### Core Packages

These packages are indispensable for basic platform operation. And observing dependency relationships should be loaded into this exact order:

* [keplerjs:lib](packages/keplerjs-lib)
* [keplerjs:i18n](packages/keplerjs-i18n)
* [keplerjs:core](packages/keplerjs-core)
* [keplerjs:ui](packages/keplerjs-ui)

### Kepler Plugins

The *Kepler plugin packages* provide useful features for your Kepler application.
A **Kepler plugin** is a simple meteor package that contains a **plugin.js** file that defines the behaviors and configuration in the kepler environment. A plugin only need to make your own package depend on *keplerjs:core* or others plugins if needed.

#### Base Plugins
* [keplerjs:edit](packages/keplerjs-edit)
* [keplerjs:admin](packages/keplerjs-admin)
* [keplerjs:theme](packages/keplerjs-theme)

#### Optional Plugins

* [keplerjs:api](packages/keplerjs-api)
* [keplerjs:upload](packages/keplerjs-upload)
* [keplerjs:geoinfo](packages/keplerjs-geoinfo)
* [keplerjs:osm](packages/keplerjs-osm)
* [keplerjs:categories](packages/keplerjs-categories)

#### Additional Plugins
* [keplerjs:conver](packages/keplerjs-conver)
* [keplerjs:events](packages/keplerjs-events)
* [keplerjs:favorites](packages/keplerjs-favorites)
* [keplerjs:googlemaps](packages/keplerjs-googlemaps)
* [keplerjs:notif](packages/keplerjs-notif)
* [keplerjs:pois](packages/keplerjs-pois)
* [keplerjs:share](packages/keplerjs-share)
* [keplerjs:tracks](packages/keplerjs-tracks)
* [keplerjs:weather](packages/keplerjs-weather)

####  3rd party Plugins

*Are expected to be developed by the great community of Meteor developers...*


## Kepler Environment
Most of the logic and configuration modules are contained in the package [keplerjs:core](packages/keplerjs-core/README.md) under the namespace **Kepler.** or **K.** is the same thing. Inside this namespace the general rule is that *Modules* or *Models* are capitalized instead the configuration objects are lowercase.

##### Models (client)
Define the "Classes" for create new istances of Kepler objects.
For now these are based on the popular John Resig [Class.js](packages/keplerjs-lib/lib/Class.js).
Usually in some kepler plugins these can be extended adding behaviors/methods using files having the same name combined with the name of plugin extends it. (example [Place_pois.js](packages/keplerjs-pois/client/Place_pois.js))
* [K.Place](packages/keplerjs-core/client/Place.js)
   define logic and manage data of the *places* shown on the map and UI
* [K.User](packages/keplerjs-core/client/User.js)
  define logic and manage data of the *users* shown on the map and UI

##### Modules (client):
Contains *methods*, *subscriptions* and *business logic* that can be used in other parts of the code, often in views or other modules and model istances.
* [K.Profile](packages/keplerjs-core/client/Profile.js)
  define methods logic and manage data of the *logged user*
* [K.Map](packages/keplerjs-core/client/Map.js)
  Manages and builds the primary leaflet with all its layers and controls 

##### Modules (client,server):
* [K.Cache](packages/keplerjs-core/modules/Cache.js)
* [K.Plugin](packages/keplerjs-core/modules/Plugin.js)
* [K.Util](packages/keplerjs-core/modules/Util.js)

##### Configurations (client,server):
* [K.settings](packages/keplerjs-core/settings.js)
* [K.schemas](packages/keplerjs-core/modules/schemas.js)
* [K.filters](packages/keplerjs-core/modules/filters.js)
* [K.placeholders](packages/keplerjs-core/modules/placeholders.js)


### Settings
The main default settings are located in [K.settings](packages/keplerjs-core/settings.js) and an example of custom settings is *private/settings.sample.json*
Special configurations of individual plugins can be overridden.
To see *packages/\<plugin-name\>/plugin.js* file in the *settings* section.

```sh
meteor --settings private/settings.sample.json 
```

### License
Note that Kepler is distributed under the [MIT License](http://opensource.org/licenses/MIT)
