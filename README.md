![KeplerJs](./keplerjs.png) 

## KeplerJS

The full-stack real-time geo-social network framework
lets users share favorite places and join discussions

### Links

*[DEMO online](https://keplerjs.herokuapp.com/)* deployed on **Heroku**

* [Blog](https://keplerjs.tumblr.com/)
* [Roadmap](https://trello.com/b/FBK72QEJ/keplerjs-roadmap)
* [Github](https://github.com/Keplerjs)
* [NPM](https://www.npmjs.com/org/keplerjs)
* [Atmospherejs](https://atmospherejs.com/keplerjs)

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

* [keplerjs:lib](packages/keplerjs-lib)
* [keplerjs:i18n](packages/keplerjs-i18n)
* [keplerjs:core](packages/keplerjs-core)
* [keplerjs:ui](packages/keplerjs-ui)
* [keplerjs:api](packages/keplerjs-api)

#### Plugin Packages

These plugin packages provide additional features for your Kepler app.
A plugin to work and to be defined as a rule to contain a file *plugin.js* that defines the behavior and configuration in the kepler environment.
A plugin only need to make your own package depend on *keplerjs:core* or others plugins if needed.

#### Core Plugins

* [keplerjs:categories](packages/keplerjs-categories)
* [keplerjs:conver](packages/keplerjs-conver)
* [keplerjs:events](packages/keplerjs-events)
* [keplerjs:geoinfo](packages/keplerjs-geoinfo)
* [keplerjs:googlemaps](packages/keplerjs-googlemaps)
* [keplerjs:notif](packages/keplerjs-notif)
* [keplerjs:osm](packages/keplerjs-osm)
* [keplerjs:pois](packages/keplerjs-pois)
* [keplerjs:share](packages/keplerjs-share)
* [keplerjs:theme](packages/keplerjs-theme)
* [keplerjs:tracks](packages/keplerjs-tracks)
* [keplerjs:upload](packages/keplerjs-upload)
* [keplerjs:weather](packages/keplerjs-weather)

####  3rd party Plugins Packages

*Are expected to be developed by the great community of Meteor developers...*

### License
Note that Kepler is distributed under the [MIT License](http://opensource.org/licenses/MIT)
