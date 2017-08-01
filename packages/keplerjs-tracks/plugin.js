
K.Plugin({
	name: 'tracks',
	placeholders: {
		panelPlace: 'panelPlace_tracks',
		popupPlace: 'popupPlace_tracks',
		popupGeojson: 'popupGeojson_tracks'
	},
	filters: {
		placePanel: {
			fields: {
				tracks: 1
			}
		}
	},
	settings: {
		"public": {
			"map": {
				"styles": {
					"tracks": { "color": "#66f", "weight": 8, "opacity": 0.7 }
				}	
			},
			"tracks": {
				"maxDistance": 150,
				"limit": 2				
			}
		}
	}
});
