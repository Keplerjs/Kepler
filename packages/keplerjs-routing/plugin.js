/*

//TODO share obejcts to overpass by osm node or way id

[out:json];way(42764800);(._;>;);
out body;way(56219784);(._;>;);
out body;

*/

K.Plugin({
	name: 'routing',
	templates: {
		//popupCursor: 'popupCursor_routing'
	},
	settings: {
		"routing": {
			"caching": true,
			//TODO api keys
		}
	}
});