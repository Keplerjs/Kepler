
K.Plugin({
	name: 'pois',
	placeholders: {
		panelPlace: 'panelPlace_pois',
		popupPlace: 'popupPlace_pois',
		popupGeojson: 'popupGeojson_pois'
	},
	filters: {
		placePanel: {
			fields: {
				pois: 1
			}
		}
	},
	settings: {
		"public": {
			"map": {
				"styles": {
					"pois": { "color": "#f33", "weight": 4, "opacity": 0.7, "dashArray": "1,6"}
				}
			},
			"pois": {
				"maxDistance": 1000,
				"limit": 10				
			}
		}
	}
});
