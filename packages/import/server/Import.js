
Kepler.extend({
	Import: {
		//
		//TODO other file formats
		//gpxToPlace
		//
		geojsonToPlace: function(feature, importName, params) {

			//TODO key to lowercase https://gist.github.com/radutta/4480e8292372da56b426f7a4c65f8774

			var geom = K.Util.sanitize.importGeometry(feature.geometry),
				props = feature.properties || {},
				loc = K.Util.geo.centroid(geom);

			if(K.Util.valid.loc(loc)) {

				return {
					name: K.Util.sanitize.name(props.name || '', true),
					url: K.Util.sanitize.url(props.url || ''),
					loc: K.Util.geo.locRound(loc, 8),
					geometry: geom,
					//TODO simplify
					import: {
						name: importName,
						data: props
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