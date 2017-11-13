
K.Plugin({
	name: 'pois',
	templates: {
		panelPlace: 'panelPlace_pois',
		popupPlace: 'popupPlace_pois',
		popupGeojson: 'popupGeojson_pois',
	},
	filters: {
		placePanel: {
			fields: {
				pois: 1
			}
		}
	},
	settings: {
		"public": {
			"map": {
				"styles": {
					"pois": { "color": "#f33", "weight": 4, "opacity": 0.7, "dashArray": "1,6"}
				}
			},
			"pois": {
				"limit": 30,
				"caching": true,	//cache response by OSM overpass
				"maxDistance": 600,
				"importPois": true,	//enable importing of pois like place
				"typesByTags": {
					"amenity=drinking_water": "water",
					"amenity=fountain":       "water",
					"amenity=bar":        "drink",
					"amenity=cafe":       "drink",
					"amenity=restaurant": "eat",
					"shop=supermarket":   "eat",
					"amenity=marketplace":"eat",
					"amenity=hospital":   "bed",
					"tourism=hotel":      "bed",
					"amenity=parking":    "parking",
					"tourism=picnic_site":"camp",
					"tourism=camp_site":  "camp",
					"highway=bus_stop":   "bus",
				}
			}
		}
	}
});
