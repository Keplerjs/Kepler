
Kepler.Pois = {

	typeByTags: function(tags) {
		var type, val;
		for(var tag in tags) {
			val = tags[tag];
			type = K.settings.public.pois.typesByTags[tag+'='+val];
			if(type)
				return type;
		}
		return type;
	},

	poisToGeojson: function(features, place, poisType) {
		//decorate Poi markers with place circle and lines from place to pois
		
		var self = this;

		if(poisType) {
			features = _.filter(features, function(feature) {
				return self.typeByTags(feature.properties.tags) === poisType;
			});
		}

		features = _.map(features, function(feature) {
			feature.templateMarker = 'markerPoi'; 
			feature.templatePopup = 'popupGeojson_pois';
			return feature;
		});

		var placeLoc = [place.loc[1], place.loc[0]],
			coordLines = _.map(features, function(poi) {
				return [placeLoc, poi.geometry.coordinates];
			}),
			poiLines = K.Util.geo.createFeature('MultiLineString', coordLines);

		return K.Util.geo.createFeatureColl(_.union(features, poiLines));
	}
};