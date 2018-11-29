
Complete list of releases [here](https://github.com/Keplerjs/Kepler/releases)

## Next version
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

## v1.5.4
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
