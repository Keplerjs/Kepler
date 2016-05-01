
Template.pageMap.onRendered(function() {
	console.log('Template.pageMap.onRendered')
	Climbo.map.initMap(Meteor.settings.public.map, function() {
		this.enableBBox();
	}); //*/
});

Template.pageMap.onDestroyed(function() {
	Climbo.map.destroyMap();
});