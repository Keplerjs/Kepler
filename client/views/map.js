
Template.map.onRendered(function() {
	Climbo.map.initMap(Meteor.settings.public.map, function(map) {
		Climbo.map.enableBBox();	//abilita caricamento markers
	});
});

Template.map.onDestroyed(function() {
	Climbo.map.destroyMap();
});