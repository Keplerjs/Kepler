
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
					f.templatePopup = 'popupGeojson_osm';
					return f;
				});
				K.Map.hideCursor();
				K.Map.layers.geojson.clearLayers().addData(geojson);
				K.Map.layers.geojson.invoke('openPopup');
			}
		});
	},

	loadByLoc: function(loc, cb) {

		Meteor.call('findOsmByLoc', loc, null, function(err, geojson) {

			if(err){
				console.log('findOsmByLoc',err)
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
			}
			if(_.isFunction(cb))
				cb(geojson);
		});
	},

	importPlace: function(obj, cb) {
		
		Meteor.call('insertPlaceByOsmId', obj.properties.id, function(err, placeId) {

			if(err)
				console.log(err)
			else {
				K.Map.hideCursor();
				K.Map.layers.geojson.clearLayers();
				Router.go('panelPlace', {placeId: placeId});
			}
			if(_.isFunction(cb))
				cb(placeId);
		});
	},

	loadTracks: function() {
		Meteor.call('findOsmByBBox', 'highway=unclassified', K.Map.getBBox(), 'way', function(err, geojson) {
			
			console.log(geojson);

			if(geojson.features.length>0)
				K.Map.addGeojson(geojson);
		});
	}
};
