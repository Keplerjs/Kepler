
K.Plugin({
	name: 'tracks',
	placeholders: {
		panelPlace: ['panelPlace_tracks'],
		popupPlace: 'popupPlace_tracks'
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
			"tracks": {
				"maxDistance": 150,
				"limit": 2				
			}
		}
	}
});
