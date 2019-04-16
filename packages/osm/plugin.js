
K.Plugin({
	name: 'osm',
	templates: {
		tabPlace: 'tabPlace_osm',
		popupCursor: 'popupCursor_osm'
	},
	filters: {
		placePanel: {
			fields: {
				osm: 1
			}
		}
	},
	schemas: {
		place: {
			osm: {}
		}
	},
	settings: {
		"osm": {
			//TODO cachetime
			"findByLocDist": 50,
			"findByLocLimit": 10,
			"findByBBoxLimit": 10,
			"overpass": {
				"flatProperties": false,
				//"overpassUrl": "http://overpass-api.de/api/interpreter",
				//"overpassUrl": "http://overpass-api.de/api/interpreter",
				//"overpassTimeout": null,
				"overpassMeta": true	//osm user and timestamp
			}
		}
	}
});