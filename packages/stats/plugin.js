
K.Plugin({
	name: 'stats',
	templates: {
		pageHome: 'pageHome_stats'
	},	
	settings: {
		"public": {
			"stats": {
				"noClassify": true	//disable geostatistics classification
			}
		},
		"stats": {
			"cacheTime": "hourly"
		}
	}
});
