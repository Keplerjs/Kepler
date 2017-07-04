/*
	poisToGeojson: decorate Poi markers with place circle and lines from place to pois
*/
poisToGeojson = function(pois, place, poisType) {

	if(poisType) {
		pois = _.filter(pois, function(feature) {
			return feature.properties.type === poisType;
		});
	}

	var gloc = [place.loc[1], place.loc[0]],
		placeCircle = K.Util.geo.createFeature('Point', gloc, {type:'placeCircle'});
		coordLines = _.map(pois, function(poi) {
			return [gloc, poi.geometry.coordinates];
		}),
		poiLines = K.Util.geo.createFeature('MultiLineString', coordLines, {type:'poiLine'}),
		features = _.union(placeCircle, pois, poiLines);

	return K.Util.geo.createFeatureColl(features);
}
