
/*Template.pageMap.onRendered(function() {
	console.log('Template.pageMap.onRendered')
	/*K.map.initMap(Meteor.settings.public.map, function() {
		this.enableBBox();
	});
});*/

Template.pageMap.onDestroyed(function() {
	K.map.destroyMap();
});