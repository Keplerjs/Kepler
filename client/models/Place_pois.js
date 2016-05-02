
function poisToGeojson(pois, place, type) {

	/* decorate Poi markers with place circle and lines from place to pois */
	
	if(type) {
		pois = _.filter(pois, function(feature) {
			return feature.properties.tipo === type;
		});
	}

	var gloc = [place.loc[1], place.loc[0]],
		placeCircle = K.util.geo.createFeature('Point', gloc, {tipo:'placeCircle'});
		coordLines = _.map(pois, function(poi) {
			return [gloc, poi.geometry.coordinates];
		}),
		poiLines = K.util.geo.createFeature('MultiLineString', coordLines, {tipo:'poiLine'}),
		features = _.union(placeCircle, pois, poiLines);

	return K.util.geo.createFeatureColl(features);
}

Kepler.Place.include({

	loadPois: function(type) {

		var pois = getPoisByLoc(this.loc).fetch();

		K.map.loadGeojson( poisToGeojson(pois, this, type) );
	},
	
	getPoisList: function() {

		var pois = getPoisByLoc(this.loc).fetch(),
			types = _.countBy(pois, function(feature) {
				return feature.properties.tipo;
			});

		return _.map(types, function(val, tipo) {
			return {
				type: tipo,
				count: val,
				title: i18n('ui.pois.'+tipo)
			};
		});
	}
});