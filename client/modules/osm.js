
//TODO Osms = new Mongo.Collection('osm');

var tags2class = {
'amenity=drinking_water': 'water',
'amenity=parking': 'parking',
'amenity=restaurant': 'eat',
'tourism=camp_site': 'camp',
'amenity=hospital': 'bed',
'tourism=hotel': 'bed',
'amenity=bar': 'drink'
};

Kepler.osm = {
	loadQuery: function(filter) {

		filter = filter || 'amenity=bar';

		var bbox = K.map.getBBox();
		
		Meteor.call('getOverpassByBBox', filter, bbox, function(err, geojson) {
			
			//console.log('getOverpassByBBox',geojson.features.length);

			if(geojson.features.length)
				K.map.loadGeojson(geojson);
		});
	},
	iconByTags: function(tags) {
		for(var tag in tags) {
			var tagval = tag+'='+tags[tag];

			if(tags2class[tagval])
				return 'icon icon-'+tags2class[tagval];
		}
		return '';
	}
};


setTimeout(function() {

	K.map._map.on('click', function(e) {
		var loc = [e.latlng.lat, e.latlng.lng];
			filter = '';

		Meteor.call('getOverpassByNear', 'amenity', loc, function(err, geojson) {
			
			console.log('getOverpassByBBox',geojson);

			if(geojson.features.length)
				K.map.loadGeojson(geojson);
		});
	});

},2000);
