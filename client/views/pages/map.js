
Template.pageMap.onRendered(function() {
	Climbo.map.initMap(Meteor.settings.public.map, function(map) {
		Climbo.map.enableBBox();
	});
});

Template.pageMap.onDestroyed(function() {
	Climbo.map.destroyMap();
});