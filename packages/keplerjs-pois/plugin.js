
K.Plugin({
	name: 'pois',
	placeholders: {
		panelPlace: 'panelPlace_pois',
		popupPlace: 'popupPlace_pois'
	},
	settings: {
		public: {
			"maxPois": 10,
			"maxPoisDist": 1000
		}
	}
});

/*
	example: add multiple plugin templates in same placeholder
K.Plugin({
	name: 'pois2',	//the same package can to define more internals plugins
	placeholders: {
		panelPlace: 'popupPlace_pois2'
	}
});*/