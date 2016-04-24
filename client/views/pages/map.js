
Template.pageMap.onRendered(function() {
	Climbo.map.initMap(Climbo.profile.mapSets, function(map) {
		Climbo.map.enableBBox();
	});
});

Template.pageMap.onDestroyed(function() {
	Climbo.map.destroyMap();
});