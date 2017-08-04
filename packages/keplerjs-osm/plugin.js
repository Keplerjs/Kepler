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
	settings: {
		"public": {
			"osm": {
			}
		}
	}
});