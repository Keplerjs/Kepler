
K.Plugin({
	name: 'pois',
	placeholders: {
		panelPlace: 'panelPlace_pois',
		popupPlace: 'popupPlace_pois',
		popupGeojson: 'popupGeojson_pois'
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
				"limit": 10,
				"maxDistance": 1500,
				"typesByTags": {
					"amenity=drinking_water": "water",
					"amenity=fountain":  "water",
					"amenity=restaurant": "eat",
					"amenity=hospital":   "bed",
					"amenity=parking":    "parking",
					"amenity=cafe":       "drink",
					"amenity=bar":        "drink",
					//"highway=bus_stop":   "bus",
					"tourism=picnic_site":"camp", 
					"tourism=camp_site":  "camp",
					"tourism=hotel":      "bed"
				}
			}
		}
	}
});
