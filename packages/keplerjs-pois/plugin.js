
K.Plugin({
	name: 'pois',
	templates: {
		panelPlace: ['panelPlace_pois'],
		popupPlace: ''
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
