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
			"findByLocDist": 20,
			"findByLocLimit": 1,
			"findByBBoxLimit": 20,
			"overpassUrl": "http://overpass-api.de/api/interpreter",
			"overpassMeta": true,
			"overpassTimeout": null
		}
	}
});