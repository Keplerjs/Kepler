![KeplerJs](./keplerjs.png) 

## KeplerJS

The full-stack real-time geo-social network framework
lets users share favorite places and join discussions

### Links

*[DEMO online](https://keplerjs.herokuapp.com/)* deployed on **Heroku**

* [Blog](https://keplerjs.tumblr.com/)
* [Github](https://github.com/Keplerjs)
* [NPM](https://www.npmjs.com/org/keplerjs)
* [Atmospherejs](https://atmospherejs.com/keplerjs)
* [Roadmap](https://trello.com/b/FBK72QEJ/keplerjs-roadmap)

[![Stories in Ready](https://badge.waffle.io/Keplerjs/Kepler.png?label=ready&title=Ready)](https://waffle.io/Keplerjs/Kepler?utm_source=badge)

### Install

```sh
npm i
npm start
```

And open http://localhost:3000/ in your browser.

#### Settings
Default settings file: *private/settings.sample.json*
Special configurations of individual plugins can be overridden.
To see *packages/plugin-dir/plugin.js* file in the *settings* section.

```sh
meteor --settings private/settings.sample.json 
```

### Architecture

Kepler uses a [package-based architecture](http://experimentsinmeteor.com/package-based-architecture/), meaning that the entirety of its codebase resides in */packages*
Different packages can play different behaviors. So here's a quick overview of the different package categories you'll come across. 

#### Core Packages

These packages are indispensable for basic platform operation. And observing dependency relationships should be loaded into this precise order:

* [keplerjs:lib](packages/keplerjs-lib)
* [keplerjs:i18n](packages/keplerjs-i18n)
* [keplerjs:core](packages/keplerjs-core)
* [keplerjs:ui](packages/keplerjs-ui)

#### kepler Environment
Most of the logic and configuration modules are contained in the pkg *keplerjs:core* under the namespace **Kepler.** or **K.** is the same thing. Inside this namespace the general rule is that *Modules* or *Models* are capitalized, example:
[K.Place](),
K.User, K.Profile, K.Map, K.Util, K.Cache, K.Plugin, 

instead the configuration objects are lowercase.
	schemas
	filters
	placeholders
	settings

#### Kepler Plugins

The *Kepler plugin packages* provide useful features for your Kepler application.
A *Kepler plugin* is a simple meteor package that contains a **plugin.js** file that defines the behaviors and configuration in the kepler environment.
A plugin only need to make your own package depend on *keplerjs:core* or others plugins if needed.

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

### License
Note that Kepler is distributed under the [MIT License](http://opensource.org/licenses/MIT)
