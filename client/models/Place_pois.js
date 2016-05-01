
function poisToGeojson(pois, place, type) {

	/* decorate Poi markers with place circle and lines from place to pois */
	
	if(type) {
		pois = _.filter(pois, function(feature) {
			return feature.properties.tipo === type;
		});
	}

	var gloc = [place.loc[1], place.loc[0]],
		placeCircle = Climbo.util.geo.createFeature('Point', gloc, {tipo:'placeCircle'});
		coordLines = _.map(pois, function(poi) {
			return [gloc, poi.geometry.coordinates];
		}),
		poiLines = Climbo.util.geo.createFeature('MultiLineString', coordLines, {tipo:'poiLine'}),
		features = _.union(placeCircle, pois, poiLines);

	return Climbo.util.geo.createFeatureColl(features);
}

Climbo.Place.include({

	loadPois: function(type) {

		var pois = getPoisByLoc(this.loc).fetch();

		Climbo.map.loadGeojson( poisToGeojson(pois, this, type) );
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