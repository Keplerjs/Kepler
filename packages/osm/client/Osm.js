
Kepler.Osm = {
	
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

		var opts = {
			filter: '~".*"~".*"',//'highway~".*"',
			type: 'node',//'way'
			limit: 1
		};

		Meteor.call('findOsmByLoc', loc, opts, function(err, geojson) {

			if(err){
				console.log('findOsmByLoc',err)
			}
			else if(geojson && geojson.features.length) {

				geojson.features = _.map(geojson.features, function(feature) {
					feature.templateMarker = 'markerOsm';
					feature.templatePopup = 'popupGeojson_osm';
					return feature;
				});
				K.Map.hideCursor();
				K.Map.addGeojson(geojson, null, function() {
					K.Map.layers.geojson.invoke('openPopup');
				});
			}
			if(_.isFunction(cb))
				cb(geojson);
		});
	},

	importPlace: function(osmId, cb) {
		
		Meteor.call('insertPlaceByOsmId', osmId, function(err, placeId) {

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
	}
};
