
K.Plugin({
	name: 'tracks',
	templates: {
		panelPlace: 'panelPlace_tracks',
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
			"map": {
				"styles": {
					"tracks": { "color": "#66f", "weight": 8, "opacity": 0.7 }
				}	
			},
			"tracks": {
				"limit": 5,
				"caching": true,	//cache response by OSM overpass		
				"maxDistance": 800,
				"typesByTags": {
					"highway=path": "path",
					"highway=track": "path",
					"highway=footway": "path"
				}			
			}
		}
	}
});
