# Changelog
All notable changes to this project will be documented in this file.

[The Official Roadmap](http://bit.ly/KeplerJsRoadmap)

[Downloadable releases](https://github.com/Keplerjs/Kepler/releases)

## [Next Version]
...

## v1.7.0 - Public Contents
- show contents for not logged users can be enabled by settings.route.publicRoutes
- core new module K.queries, to prefilter every queries before show result by settings.json
- core move K.settings.queries in  K.settings.public.queries
- core Plugin templates placeholder show support function value
- core Place schema is a valid geojson format
- core node config directory to moved configurations
- core renamed K.settings.public.router.enterRoute in .loginRoute
- core rename root route in K.settings.public.router.mainRoute
- core add new sets K.settings.public.router.mainRoute that replace 'root' route
- core new file /config/settings.js to configure modules from settings.json
- core new method K.Map.cleanItems()
- core new K.settings.public.map.layerPlaces.clusterOpts
- core new method K.Util.sets()
- core query K.findPlacesByBBox() support additional query parameter
- core new K.Map.query() introduce query param to filter map markers(client)
- core K.Map.showLoc() support zoom level
- core K.Map.setOpts() change state
- core param label in K.Map.addGeojson() show control swich
- core-ui helper routeIs support array
- core-ui simplify helper settings now is also object
- core-ui fix panel close href
- core-ui new placehoder panelPlaces/panelUsers and split templates
- core-ui new control K.Map.controls.switch to show Map queries and other options
- core-ui new options K.settings.public.map.query to filter map contents
- core-ui new default template footer_ui_lang select lang from not logged users
- lib add meteor reactive-dict
- plugin osm updatePlaceByOsmId
- plugin osm new helper osmEditUrlById
- plugin edit edit loc by coordinates
- plugin edit fullscreen for edit map
- plugin edit highlight marker place on editing
- plugin edit new addbutton control
- plugin edit new template panelPlaceEdit_edit_creation
- plugin categories new template panelPlaceEdit_cats_all
- plugin categories new admin method updateCatsCountsByType
- plugin admin use new settings by function
- plugin admin editing of raw data place
- plugin theme fix css marker-place icons
- plugin stats findStatsPlacesByField support array values
- plugin pois support settings.public.pois.typesByTags disabled
- plugin tracks support settings.public.tracks.typesByTags disabled
- plugin tracks fix osm query
- plugin tracks new route to open single track by id
- plugin admin new panel admin methods
- plugin import new placeholder panelImport
- plugin new method osm findOsmByQuery

## v1.6.8 - fixes geometry import and osm plugins
- core K.Place.showLoc() and K.Place.showGeometry() support callaback
- plugin osm K.Osm.findByLoc() support node and way
- plugin import reduce MultiGeometry to single one using new method K.Util.sanitize.importGeometry()

## v1.6.7 - Full Geojson Geometry Support
- core new settings K.settings.public.map.checkinGeometry autocheckin inside place geometry
- core new method K.Place.showGeometry()
- core search place name in Fulltext
- core rename methods K.Util.geo.bboxContains(), bboxReverse(), bboxPlain(), bboxRound() 
- core rename methods K.Util.geo.locBuffer(), locTransform(), locRound()
- core simplify method K.Util.geo.bboxContains()
- core new method L.Util.geo.centroid() support Point, Polygon, MultiPolygon
- core new method L.Util.geo.pointInLinestring()
- core K.Util.geo.point() accept [lat,lon]
- core edit outputof K.Util.timeName()
- core fix K.Util.sanitize.fileName()
- core fix K.Util.sanitize.fileExt()
- core K.Util.sanitize.name() lower param
- core index 2dsphere geometry field
- core new method K.Util.valid.point()
- core fix place click location in places news panel
- plugin theme new icon-gps
- plugin admin fix show geometry in minimap
- plugin geoinfo autoupdate geoinfo field when loc is changed
- plugin upload rename param 'callback' in 'onUploaded' in template inputFile_upload
- plugin upload new param 'params' in template inputFile_upload
- plugin upload new method K.Upload.loadFile()
- plugin import preview of geojson data on map before upload
- plugin import K.Import.geojsonToPlace()
- plugin import new params importname by form
- plugin import new global method K.Util.sanitize.importName
- plugin import K.settings.public.import.limit
- plugin import fix panel data
- plugin import support geojson LineString centroid
- plugin edit split template panelPlaceEdit in panelPlaceEdit_edit_map
- plugin edit new method K.Place.setGeometry()
- plugin edit panel edit location and place geometry by Leaflet Draw
- plugin edit restyle panelEdit
- plugin edit new templates panelPlaceEdit_edit_del, panelPlaceEdit_edit_info
- plugin categories new template panelPlaceEdit_cats_latest
- plugin categories fix remove cat button
- plugin categories all categories panel for non admin users
- plugin osm import geometry from openstreetmap 

## v1.6.6
- core support Instagram OAuth signup
- core-ui fix fullscreen to add in home
- core create if not exists geometry field on loc update 
- core fix zoom min for cluster disable
- core hide tooltip on popup open
- core K.Util.geo.featureColl have properties
- core new Kepler module K.Alert.xxx to show notifications over the map(extend sAlert lib)
- core new method K.Util.humanize.url()
- core settings K.settings.public.map.disableClusteringAtZoom,
- new placeholder itemPlaceSearch
- plugin admin add friend in user admin
- plugin admin change place owner
- plugin admin new method normalizePlaces to debug data
- plugin api default disabled rest by new sets K.settings.api.enableRest
- plugin api fix queries
- plugin cats moved typeahead.js in kepler plugin edit
- plugin edit new Place reactive var placeInstance.getOwner()
- plugin geoinfo show country and city in place search results
- plugin stats renamed in K.settings.stats.classify
- plugin stats rewritten in submodules
- plugin stats plugin stats testing bbox support

## v1.6.5 - Place editing improvement
- new tab in panel place show nearby places
- replace lib verron:autosize with npm version
- plugin cats fix K.Util.sanitize.catName
- plugin cats fica removeCat
- plugin edit support description place editing
- plugin edit change place location
- plugin edit fix owner on remove
- plugin theme new icon icon-places
- plugin admin button in place panel
- plugin admin move urls under /admin
- plugin convers move autoresize lib in core lib
- map zoom dblclick
- new tab tabPlace_ui_nearby

## v1.6.4
- fix map markers glich
- updated leaflet-layerjson
- remove 3rd party kepler plugins from .meteor/packages

## v1.6.3 - Routing & Caching optimizations
- renamed all caching settings in cacheTime
- fix K.Cache.get cacheTime
- core added default geometry for places
- core rename methods K.Util.geo.point,feature,featureColl
- core default value K.Cache.expire
- lib include Latinize in client side
- plugin admin show geometry plae in panel admin
- update npm packages, bcrypt babel
- plugin api new K.settings.public.api.baseUrl
- plugin api K.Api.writeOut() used by plugin stats
- plugin api K.settings.api.jsonp
- plugin stats depends from plugin api
- plugin admin move method in server method K.adminsEmai()
- plugin admin fix search user list result double
- plugin admin K.Admin.getIpInfo()
- plugin categories show cat rank
- plugin categories K.Admin.cleanCatsOrphan()
- plugin geoinfo use for each methods K.settings.geoinfo.cacheTime

## v1.6.2 - Routing Point of Interests and Meteor 1.8
- upgrade to Meteor 1.8.1 and other libs updates
- new method K.Util.setPath set sub property of object by path string
- new method K.Util.json2html transform json or literal object into a nested ul list
- plugin pois new async method K.Place.loadPoisTracks()
- plugin Openrouteservice extend K.Pois.poisTracks
- plugin Openrouteservice K.settings.public.openrouteservice.poisRoutes
- plugin Openrouteservice K.settings.openrouteservice.caching
- plugin admin new settings adminsAutoFriendship
- plugin geoinfo new method K.Geoinfo.getIpInfo
- plugin admin new method for debug data in database, sanitizePlacesField
- plugin geoinfo sanitize text values
- plugin stats new stat findPlacesByField 
- plugins pois tracks, alert not found
- fix K.Util.sanitize.regExp
- fix mobile status
- fix K.Map zoomout geojson reloading

## v1.6.1 - API enhancement and docs
- new user field loginIp
- plugin admin new sessions section in user admin panel
- custom meta and link tags by settings by K.settings.public.router.meta
- plugin admin create route for each loaded places and users, fix categories tagsinput bug
- core-ui new helper routeParam, renamed helper ifRoute in routeIs 
- plugin geoingo new method K.Geoapi.reversegeo
- new helper routeBack to get url of parent route
- plugin admin close panel
- increased coverage for jsdoc comments in the code
- plugin admin new option K.settings.admin.emailOnStartup

## v1.6.0 - Administration Categories
- rename base package from ui to core-ui
- various fixes

## v1.5.9
- rename place file urls in urls
- plugin edit url field is editable
- plugin geoinfo fields calculate asyncronous on new place insert
- fix all removeItem hide marker
- disable gps when gone offline
- new method K.Util.valid.bbox()
- plugin edit button in place popup
- plugin categories panel admin, search categories by name and type
- core new blaze helper {{join array}}
- new template helper join
- plugin categories use tagsinput 
- plugin categories admin remove categories
- plugin categories admin create new cat by name
- plugin categories admin user and place sections

## v1.5.8 - Advaced Backend and Publish Tools
- movable places
- plugin photos support creation new place by exif photo
- plugin photos show news photos in sidebar
- panelList support grid view
- plugin photos show my photos in profile panel
- plugin geoinfo suggest name in panel edit
- new method K.Profile.setMobile()
- map gps fix gps user
- plugin geoinfo in panelEdit Name tips by locality
- K.Map.addGeojson fix params
- K.Util.sanitize rename funcs
- plugin import manage import name, bulk remove
- open cursor popup on dblclick
- new method K.Util.geo.transformLoc()
- plugin geoinfo new method updatePlaceGeoinfo() and reload btn in panelEdit

## v1.5.7 - Administration User Interface
- plugin admin new page admin users
- plugin admin new page manager users
- plugin admin new template panelUserAdmin
- plugin admin method K.Amin.call() support multiple params
- plugin photos new mwthod storePhoto
- plugin photos set place photo url without baseurl
- plugin share fix google link
- plugin favorites show icon in marker place
- plugin upload fix upload err text
- new method K.Util.sanitize.filenameExt()

## v1.5.6
- various fixes

## v1.5.5 - Publishing Pictures
- plugin photos resize uploaded photos by settings
- plugin photos load place photo
- open photo clicking image avatar
- plugin upload method K.Upload.uploadFile accepts custom prams
- new method K.Util.geo.parseLocString to parse DMS locations
- plugin import remove button in places list
- plugin photos use npm imagemagick
- plugin photos split templates in edit panel and tab place
- fix place edit categories
- plugin edit check if plugin admin exists on delete place
- double click on marker open panel place
- new method plugin admin updatePlaceAuthor
- plugin categories, search places by category
- plugin photos added photo viewr in fullscreen

## v1.5.4 - Upload Contents
- new plugin photos
- plugin photos manage users avatars in profile settings
- generalize plugin upload inputFile_upload template
- new admin method updateUserPassword
- new admin settings settings.admin.emailOnNewUser
- plugin photos has two new method resizePhoto, updateAvatar
- plugin photos new settinngs mimeFileType to check image format
- plugin import use plugin upload

## v1.5.3
- new settings to disable user markers settings.public.map.layerUsers.enabled
- disable placeholders by settings.json
- fix panelUser template
- block email send if user created by admin
- fix profile messages sort
- new template panelProfile_ui_connect

## v1.5.2
- new settings public.map.checkinAutomatic
- new settings public.router.enterRoute link to enter button

## v1.5.0 - Compositional UI by settings
- new param html separator in pluginsTemplate
- render defaults ui templates defined by settings
- new settings K.settings.public.accounts.services to disable each oauth service
- redirections base paths /users, /places
- split panel settings templates in more configurable templates
- convert user lang code in lang name
- enable/disable cursor, popups and tooltips by settings
- new templates tabPlace_ui_hist, tabUser_ui_hist, tabUser_ui_friends
- fix popups opts

## v1.4.9
- new settings bboxMaxResults
- plugin import remove edit dependecies
- show public conversations in user panel 
- redefine placeholders panelUser, panelPlace, tabUser, tabPlace
- fix placeholder itemUser

## v1.4.8 - Import Bulk Data
- new plugin Import, support import from geojson file
- new template placeholder panelAdmin
- geoinfo plugin new settings autoupdate

## v1.4.7 - Modularity and Extensibility is ready
- published all plugins in atmospherejs.com
- remove workarounnd globsync from all plugins
- fix all addAssets and addFiles in plugins
- simplified version management in plugins
- simplify K.Plugin config for define new custom template placeholders
- fix api plugin routes
- fix robots plugin avatars

## v1.4.0 - Categories and Custom Placeholders
- new plugin categories work
- new option settings.public.accounts.creation to disable all signup ways
- use accounts-ui-unstyled instead ian:accounts-ui-bootstrap-3
- verify existence in plugin templates definition
- support custom style for each geojson features in K.Map.addGeojson()
- move features from plugin tracks to geoinfo under new method K.Geoinfo.getTrackInfo()
- K.Map.addGeojson new option clear
- remove placeholder popupGeojson
- added K.Place attribute classMarker
- new option placehodelrs in K.Plugin definition
- plugin categories support edits

## v1.3.7 - Support Meteor 1.7 and Leaflet 1.3
- Meteor 1.7.0.5 compatibility
- update @babel/runtime 7.0.0-beta.55
- added support to Github OAuth
- update Leaflet 1.3.0
- tooltip marker over marker
- plugin stats simplify rest api
- create new plugin Openrouteservice

## v1.3.0 - Compositional User Interface
- changes *K.templates* definition format
- support templates plugin custom ordering
- override templates config by *settings.json*
- rewrite Place icon building using Meteor templates
- defined new templates placeholders: *markerPlace*, *markerUser*, *markerCursor*
- show conversations count in markers

## v1.2.5
- plugins renamed dirs in plain name
- remove semver in deps plugins
- rename plugins: notifs,convers

## v1.2.4
- renamed plugin Conver in Convers
- K.Cache support auto expiration cache

## v1.2.3
- verification new user account by email link

## v1.2.2
- refactoring convers plugin

## v1.2.1
- support Meteor 1.5.1

## v1.2.0
- support Meteor 1.4.0

## v1.1.0
- optimize plugins pois and tracks for overpass api
- show created places in user panel
- show favorites place of users in panel
- updates i18n for fr
