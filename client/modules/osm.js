
//TODO Osms = new Mongo.Collection('osm');

var POIS = [
	'amenity=bar',
	'amenity=drinking_water',
	'amenity=restaurant',
	'amenity=hospital',
	'amenity=clinic',
	'amenity=pharmacy',
	'amenity=parking',
	'amenity=bicycle_parking',
	'tourism=hotel',
	'leisure=playground',
	'tourism=camp_site'
];

Kepler.osm = {
	loadQuery: function(filter) {

		var bbox = K.map.getBBox();
		
		Meteor.call('overpass', filter, bbox, function(err, geojson) {
			
			K.map.loadGeojson(geojson);
		});
	}
};