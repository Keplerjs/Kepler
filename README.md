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
meteor --settings private/settings.sample.json 
```

### Architecture

Kepler uses a [package-based architecture](http://experimentsinmeteor.com/package-based-architecture/), meaning that the entirety of its codebase resides in */packages*
Different packages can play different behaviors. So here's a quick overview of the different package categories you'll come across. 

#### Core Packages

* [keplerjs:lib](packages/keplerjs-lib/README.md)
* [keplerjs:i18n](packages/keplerjs-i18n/README.md)
* [keplerjs:core](packages/keplerjs-core/README.md)
* [keplerjs:ui](packages/keplerjs-ui/README.md)
* [keplerjs:api](packages/keplerjs-api/README.md)

#### Plugin Packages

These plugin packages provide additional features for your Kepler app.
A plugin to work and to be defined as a rule to contain a file *plugin.js* that defines the behavior and configuration in the kepler environment.
A plugin only need to make your own package depend on *keplerjs:core* or others plugins if needed.

#### Core Plugins

* [keplerjs:categories](packages/keplerjs-categories/README.md)
* [keplerjs:conver](packages/keplerjs-conver/README.md)
* [keplerjs:events](packages/keplerjs-events/README.md)
* [keplerjs:geoinfo](packages/keplerjs-geoinfo/README.md)
* [keplerjs:googlemaps](packages/keplerjs-googlemaps/README.md)
* [keplerjs:notif](packages/keplerjs-notif/README.md)
* [keplerjs:osm](packages/keplerjs-osm/README.md)
* [keplerjs:pois](packages/keplerjs-pois/README.md)
* [keplerjs:share](packages/keplerjs-share/README.md)
* [keplerjs:theme](packages/keplerjs-theme/README.md)
* [keplerjs:tracks](packages/keplerjs-tracks/README.md)
* [keplerjs:upload](packages/keplerjs-upload/README.md)
* [keplerjs:weather](packages/keplerjs-weather/README.md)

####  3rd party Plugins Packages

*Are expected to be developed by the great community of Meteor developers...*

### License
Note that Kepler is distributed under the [MIT License](http://opensource.org/licenses/MIT)
