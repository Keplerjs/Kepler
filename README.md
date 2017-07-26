![KeplerJs](./keplerjs.png)

# KeplerJS

The full-stack real-time geo-social network framework
lets users share favorite places and join discussions


Built with [Meteor](http://meteor.com)

## Packages
Kepler uses a [package-based architecture](http://experimentsinmeteor.com/package-based-architecture/), meaning that the entirety of its codebase resides in */packages*

## Kepler Packages

Different packages can play different roles. So here's a quick overview of the different package categories you'll come across. 

#### Core Packages

The `keplerjs:core` package contains the heart of Kepler, and itself depends on a set of core packages:

* keplerjs:lib
* keplerjs:i18n

Note that since `keplerjs:core` already includes these dependencies, you only need to make your own package depend on `vulcan:core`. 

### Kepler Plugin Packages

These plugin packages provide additional features for your Kepler app.

* keplerjs:core
* keplerjs:ui
* keplerjs:theme

#### Base Packages
* keplerjs:api
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
```
### License
Note that Kepler is distributed under the [MIT License](http://opensource.org/licenses/MIT)