
K.Plugin({
	name: 'stats',
	settings: {
		"public": {
			"stats": {
				"noClassify": true,	//disable geostatistics classification
				"mapStyle": {
					"weight": 2,
					"opacity": 0.8,
					"fillOpacity": 0.8,
					"fillColor": "#9c0",
					"color": "#7a0"
				}
			}
		},
		"stats": {
			"cacheTime": "hourly",
			"apiHeaders": {
				//custom http headers for API response
				//"Access-Control-Allow-Origin": "*"
			}
		}
	}
});
