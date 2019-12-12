
K.Plugin({
	name: 'pois',
	templates: {
		tabPlace: 'tabPlace_pois',
		popupPlace: 'popupPlace_pois'
	},
	settings: {
		"public": {
			"map": {
				"styles": {
					"pois": {
						"color": "#f33", "opacity": 0.6, "weight": 3//, "dashArray": "4,6"
					}
				}
			},
			"router": {
				"publicRoutes": {
					"placePois": false
				}
			},
			"pois": {
				"limit": 10,
				"caching": false,	//cache response by OSM overpass
				"maxDistance": 500,
				"importPois": true,	//enable importing of pois like place
				"typesByTags": {
					//osm tags classification
					//docs https://wiki.openstreetmap.org/wiki/Overpass_API/Overpass_API_by_Example
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
