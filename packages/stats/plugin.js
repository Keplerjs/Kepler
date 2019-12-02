
K.Plugin({
	name: 'stats',
	filters: {
		placeStats: {
			fields: { createdAt:1, loc:1, rank:1, checkins:1, hist:1, convers:1 },
			sort: { createdAt: -1}
		},
		userStats: {
			fields: { createdAt:1, loc:1, loclast:1, places:1, friends:1, convers:1, hist:1, favorites:1 },
			sort: { createdAt: -1}
		}
	},
	settings: {
		"public": {
			"stats": {
				"mapStyle": {
					"weight": 0,
					"opacity": 0.9,
					"fillOpacity": 1,
					"fillColor": "#9c0",
					"color": "#7a0"
				}
			}
		},
		"stats": {
			"classify": false,	//geostatistics classification
			"cacheTime": "hourly",	//0 to disable or values: none,minutely,hourly,daily,weekly,monthly,yearly,
		}
	}
});
