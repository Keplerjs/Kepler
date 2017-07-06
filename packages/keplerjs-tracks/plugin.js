
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
		public: {
			"maxTracks": 1,
			"maxTracksDist": 150
		}
	}
});
