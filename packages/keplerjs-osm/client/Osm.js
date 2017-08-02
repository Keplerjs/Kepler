/*

http://wiki.openstreetmap.org/wiki/Overpass_API/Language_Guide
http://wiki.openstreetmap.org/wiki/Overpass_API/Overpass_API_by_Example

regexp over keys
http://wiki.openstreetmap.org/wiki/Overpass_API/Language_Guide#Tag_request_clauses_.28or_.22tag_filters.22.29

*/
var tags2poiClass = {
	'amenity=drinking_water': 'water',
	'amenity=parking': 'parking',
	'amenity=restaurant': 'eat',
	'tourism=camp_site': 'camp',
	'amenity=hospital': 'bed',
	'tourism=hotel': 'bed',
	'amenity=bar': 'drink'
};

Kepler.Osm = {
	
	iconByTags: function(tags) {
		for(var tag in tags) {
			var tagval = tag+'='+tags[tag];

			if(tags2poiClass[tagval])
				return 'icon icon-'+tags2poiClass[tagval];
		}
		return '';
	},

	loadQuery: function(loc, filter) {

		filter = filter || '~"."~"."';

		//var bbox = K.Map.getBBox();
		
		Meteor.call('findOsmByLoc', loc, filter, function(err, geojson) {

			if(err)
				console.log('findOsmByLoc', err)
			else if(geojson && geojson.features.length) {
				geojson.features = _.map(geojson.features, function(f) {
					//TODO filter properties.meta
					f.templatePopup = 'popupGeojson_osm';
					return f;
				});
				//K.Map.addGeojson(geojson);
				K.Map.layers.geojson.clearLayers().addData(geojson);
				K.Map.layers.geojson.invoke('openPopup')
			}
		});
	},

	loadTracks: function() {
		Meteor.call('findOsmByBBox', 'highway=track', K.Map.getBBox(), 'way', function(err, geojson) {
			
			console.log(geojson);

			if(geojson.features.length>0)
				K.Map.addGeojson(geojson);
		});
	}	
};
