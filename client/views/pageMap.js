
Template.pageMap.rendered = function() {
	
	console.log('pageMap rendered');

	if(!Climbo.map.initialized)
		Climbo.map.initMap(Meteor.settings.public.map, function(map) {
			//console.log('Climbo.map.initMap callback');
			Climbo.map.enableBBox();	//abilita caricamento markers
		});

};

Template.pageMap.destroyed = function() {
	console.log("pageMap.destroyed");
};