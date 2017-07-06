
K.Plugin({
	name: 'pois',
	templates: {
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
		public: {
			"maxPois": 10,
			"maxPoisDist": 1000
		}
	}
});
