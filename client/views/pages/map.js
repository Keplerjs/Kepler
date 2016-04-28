
Template.pageMap.onRendered(function() {
	Climbo.map.initMap(Meteor.settings.public.map, function() {
		this.enableBBox();
	});
});

Template.pageMap.onDestroyed(function() {
	Climbo.map.destroyMap();
});