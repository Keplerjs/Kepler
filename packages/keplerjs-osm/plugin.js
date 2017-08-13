/*

//TODO share obejcts to overpass by osm node or way id

[out:json];way(42764800);(._;>;);
out body;way(56219784);(._;>;);
out body;

*/

K.Plugin({
	name: 'osm',
	placeholders: {
		panelPlace: ['panelPlace_osm'],
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
			"findByLocDist": 50,
			"findByLocLimit": 10,
			"findByBBoxLimit": 10,
			"overpass": {
				"flatProperties": false,
				//"overpassUrl": "http://overpass-api.de/api/interpreter",
				//"overpassTimeout": null,
				"overpassMeta": true
			}
		}
	}
});