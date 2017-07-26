![KeplerJs](./keplerjs.png)

## KeplerJS

The full-stack real-time geo-social network framework
lets users share favorite places and join discussions


Built with [Meteor](http://meteor.com)

### Packages

Kepler uses a [package-based architecture](http://experimentsinmeteor.com/package-based-architecture/), meaning that the entirety of its codebase resides in */packages*
Different packages can play different roles. So here's a quick overview of the different package categories you'll come across. 

#### Core Packages

* keplerjs:lib
* keplerjs:i18n
* keplerjs:core
* keplerjs:ui
* keplerjs:api

**keplerjs:core** contains the heart of Kepler, and itself depends on a set of core packages: *keplerjs:lib*, *keplerjs:i18n*

**keplerjs:ui** define the base front-end structure od Kepler app the basic views and the minimum CSS for interface behavior.

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

Are expected to be developed by the great community of Meteor developers


### License
Note that Kepler is distributed under the [MIT License](http://opensource.org/licenses/MIT)