
K.Plugin({
	name: 'pois',
	placeholders: {
		panelPlace: ['panelPlace_pois'],
		popupPlace: 'popupPlace_pois'
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
			"pois": {
				"maxDistance": 1000,
				"limit": 10				
			}
		}
	}
});
