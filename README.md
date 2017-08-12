![KeplerJs](keplerjs.png) 

# KeplerJS

The full-stack real-time geo-social network framework
lets users share favorite places and join discussions

*[Official DEMO](https://keplerjs.herokuapp.com/)* (deployed on *Heroku*)

[Version 1.1.0](https://github.com/Keplerjs/Kepler/releases)

* Source code: [Github](https://github.com/Keplerjs)
* Meteor packages: [Atmospherejs](https://atmospherejs.com/keplerjs)
* Npm packages: [NPM](https://www.npmjs.com/org/keplerjs)
* Roadmap: [Trello](https://trello.com/b/FBK72QEJ/keplerjs-roadmap), [Waffle](https://waffle.io/Keplerjs/Kepler)
* News: [Twitter](https://twitter.com/Kepler_JS), [Tumblr](https://keplerjs.tumblr.com/)

## Architecture

Kepler uses a [package-based](http://experimentsinmeteor.com/package-based-architecture/) architecture, meaning that the entirety of its codebase resides in [/packages](packages)
Different packages can play different behaviors. So here's a quick overview of the different package categories you'll come across. 

#### Base Packages

These packages are indispensable for basic platform operation. And observing dependency relationships should be loaded into this exact order:

* [keplerjs:lib](packages/keplerjs-lib)
* [keplerjs:i18n](packages/keplerjs-i18n)
* [keplerjs:core](packages/keplerjs-core)
* [keplerjs:ui](packages/keplerjs-ui)

#### Plugins
The *Kepler plugin packages* provide useful features for your Kepler application. A *plugin package* only need to make your own package depend on *keplerjs:core* or others plugins if needed.
A **Kepler plugin** is a standard Meteor package that contains a **plugin.js** file that defines the behaviors and configuration in the kepler environment, similar in concept to [Package.js](http://docs.meteor.com/api/packagejs.html).


## Kepler Environment
Most of the logic and configuration modules are contained in the package [keplerjs:core](packages/keplerjs-core/README.md) under the [Kepler namespace](packages/keplerjs-core/Kepler.js) **Kepler.** or **K.** is the same thing. Inside this namespace the general rule is that *Modules* or *Models* are capitalized instead the configuration objects are lowercase.
The views that define the base **User Interface** structure of Kepler are contained in [keplerjs:ui](packages/keplerjs-ui/README.md). This also contains the [helpers templates](packages/keplerjs-ui/client/helpers.js) used by all views and the minimum CSS essential for the behavior of the UI.

##### Models (client)
Define the "Classes" for create new istances of Kepler objects.
For now these are based on the popular John Resig [Class.js](packages/keplerjs-lib/lib/Class.js).
Usually in some kepler plugins these can be extended adding behaviors/methods using files having the same name combined with the name of plugin extends it. (example [Place_pois.js](packages/keplerjs-pois/client/Place_pois.js))
* [K.Place](packages/keplerjs-core/client/Place.js)
   define logic and manage data of the *places* shown on the map and UI
* [K.User](packages/keplerjs-core/client/User.js)
  define logic and manage data of the *users* shown on the map and UI
  
##### Modules (client,server):
Contains *methods*, *subscriptions* and *business logic* that can be used in other parts of the code, often in views, models or other modules.
* [K.Cache](packages/keplerjs-core/modules/Cache.js)
  implement simple and smart general-purpose caching system based on *key-value*
* [K.Plugin](packages/keplerjs-core/modules/Plugin.js)
  define and manage registered *Kepler plugins* in application
* [K.Util](packages/keplerjs-core/modules/Util.js)
  large collection of generic functions, they are organized for categories:
  - [K.Util.humanize](packages/keplerjs-core/modules/Util_humanize.js)
  - [K.Util.sanitize](packages/keplerjs-core/modules/Util_sanitize.js)
  - [K.Util.valid](packages/keplerjs-core/modules/Util_valid.js)
  - [K.Util.geo](packages/keplerjs-core/modules/Util_geo.js) 

##### Modules (client):
* [K.Profile](packages/keplerjs-core/client/Profile.js)
  define methods logic and manage data of the current *logged user*
* [K.Map](packages/keplerjs-core/client/Map.js)
  manages and builds the primary [Leaflet](http://leafletjs.com/) map with all its [layers](packages/keplerjs-core/client/Map_layers.js) and [controls](packages/keplerjs-core/client/Map_controls.js))

##### Configurations (client,server):
Any basic configuration can be extended by plugins with their [plugin.js]() file
* [K.schemas](packages/keplerjs-core/modules/schemas.js)
  defines the data structures for documents in the collections, can be extended by *Kepler plugins* to host the plugin fields
* [K.filters](packages/keplerjs-core/modules/filters.js)
  defines the fields exposed in the queries for pubblications and methods, the structure of this file is deliberately aligned to enhance the different levels of data privacy
* [K.placeholders](packages/keplerjs-core/modules/placeholders.js)
  defines the *placeholders* in the UI where the plugins can extend the content with others *temaplates/views*
* [K.settings](packages/keplerjs-core/settings.js)
  contains the main default settings extended by *Kepler plugins* and from *Meteor.settings*

### UI Placeholders
Kepler implements a convenient mechanism to give plugins the ability to place their contents in the platform's basic structure. 
Using the dynamic template [pluginPlaceholder](packages/keplerjs-ui/client/views/pluginPlaceholder.js) and register the plugin's templates inside the *plugin.js* in the section placeholders.

Here an example of definitions of contents for the plugin [keplerjs:share](packages/keplerjs-share/plugin.js)
```
K.Plugin({
	name: 'share',
	placeholders: {
		panelPlace: ['panelPlace_share','panelPlace_share2'],   //single or more templates
		popupCursor: 'popupCursor_share',
		//popupUser: 'popupCursor_share'
	}
});
```
And of placeholder positioned inside the place panel [template](packages/keplerjs-ui/client/views/panels/place.html#L45)
```
{{> pluginPlaceholder name='panelPlace'}}
```

### Kepler Plugins

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

## Install

Install the latest version of [Node](https://nodejs.org) and [NPM](https://www.npmjs.com/get-npm).
You can then install [Meteor](https://www.meteor.com/install).
Clone or download the [Kepler repo](https://github.com/Keplerjs/Kepler) locally, then:
```sh
npm install
npm start
```
And open *http://localhost:3000/* in your browser.

### Settings
A example of custom settings is [settings.sample.json](private/settings.sample.json) other special settings of individual plugins can be overridden always using this same file.
To see *packages/\<plugin-name\>/plugin.js* file in the *settings* section.

```sh
meteor --settings private/settings.sample.json 
```

### License
Note that Kepler is distributed under the [MIT License](http://opensource.org/licenses/MIT)
