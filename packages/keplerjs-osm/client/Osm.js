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
	
	loadById: function(osmId) {

		Meteor.call('findOsmById', osmId, function(err, geojson) {

			if(err)
				console.log('loadById', err)
			else if(geojson && geojson.features.length) {

				geojson.features = _.map(geojson.features, function(f) {
					//TODO filter properties.meta
					f.templatePopup = 'popupGeojson_osm';
					return f;
				});
				K.Map.hideCursor();
				K.Map.layers.geojson.clearLayers().addData(geojson);
				K.Map.layers.geojson.invoke('openPopup');
			}
		});
	},

	loadByLoc: function(loc, filter, cb) {

		Meteor.call('findOsmByLoc', loc, filter, function(err, geojson) {

			if(err){
				console.log('loadByLoc', err)
				if(_.isFunction(cb))
					cb(false);
			}
			else if(geojson && geojson.features.length) {

				geojson.features = _.map(geojson.features, function(f) {
					//TODO filter properties.meta
					f.templatePopup = 'popupGeojson_osm';
					return f;
				});
				K.Map.hideCursor();
				K.Map.layers.geojson.clearLayers().addData(geojson);
				K.Map.layers.geojson.invoke('openPopup');

				if(_.isFunction(cb))
					cb(geojson);
			}
		});
	},

	insertPlace: function(obj, cb) {
		
		Meteor.call('insertPlaceByOsmId', obj.properties.id, function(err, placeId) {

			if(err)
				console.log(err)
			else {
				K.Map.hideCursor();
				K.Map.layers.geojson.clearLayers();
				Router.go('panelPlace', {placeId: placeId});
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
