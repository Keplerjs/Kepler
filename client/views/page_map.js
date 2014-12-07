
Template.page_map.rendered = function() {
	
	//console.log('page_map rendered');

	if(!Climbo.map.initialized)
		Climbo.map.initMap(Meteor.settings.public.map, function(map) {
			//console.log('Climbo.map.initMap callback');
			Climbo.map.enableBBox();	//abilita caricamento markers
		});

};

Template.page_map.destroyed = function() {
	console.log('page_map.destroyed');
	//TODO Climbo.map.destroyMap();
};
