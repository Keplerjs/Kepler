
Template.map.onRendered(function() {
	Climbo.map.initMap(Climbo.profile.mapSets, function(map) {
		Climbo.map.enableBBox();
	});
});

Template.map.onDestroyed(function() {
	Climbo.map.destroyMap();
});