
Template.pageMap.onRendered(function() {
	console.log('Template.pageMap.onRendered')
	K.map.initMap(Meteor.settings.public.map, function() {
		if(Meteor.settings.public.showPlaces)
			K.map.enableBBox();
	});//*/
});

Template.pageMap.onDestroyed(function() {
	K.map.destroyMap();
});