
K.Plugin({
	name: 'stats',
	settings: {
		"public": {
			"stats": {
				"noClassify": true	//disable geostatistics classification
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
