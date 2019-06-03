
Kepler.extend({
	Import: {
		geojsonToPlace: function(feature, importName) {

			var coords = feature.geometry.coordinates,
				props = feature.properties,
				loc = [];

			if(feature.geometry.type==='Point') {
				loc = [coords[1], coords[0]];
			}
			//TODO else centroid

			if(K.Util.valid.loc(loc)) {

				return {
					name: K.Util.sanitize.name(props.name || ''),
					url: K.Util.sanitize.url(props.url || ''),
					loc: K.Util.geo.locRound(loc, 8),
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
	}
});