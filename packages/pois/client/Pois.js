
Kepler.Pois = {
	typeByTags: function(tags) {
		var types = K.Util.sets(K.settings.public.pois.typesByTags),
			type, val;

		for(var tag in tags) {
			val = tags[tag];
			type = types[tag+'='+val];
			if(type)
				return type;
		}
		return type;
	},
 	poisToGeojson: function(features) {
 		
		var self = this;

		features = _.map(features, function(feature) {
			feature.templateMarker = 'markerPoi'; 
			feature.templatePopup = 'popupGeojson_pois';
			return feature;
		});

		return K.Util.geo.featureColl(features);
	}
};