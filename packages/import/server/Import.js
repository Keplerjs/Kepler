
Kepler.Import = {

	geojsonToPlace: function(feature, importName) {

		var prop = feature.properties,
			coords = feature.geometry.coordinates,
			loc = [coords[1], coords[0]];

		var name = prop.name || '';
		var url = prop.url || '';

		_.each(prop, function(v, k) {
			if(!v) {
				delete prop[k];
			}
		});

		if(feature.geometry.type==='Point') {
			return {
				name: K.Util.sanitize.name(name),
				url: K.Util.sanitize.url(url),
				loc: K.Util.geo.locRound(loc,8),
				active: 0,
				import: {
					name: importName,
					data: feature
				},
				source: {
					type: 'import'
				}
			};
		}
		else
			return null;
	}
};
