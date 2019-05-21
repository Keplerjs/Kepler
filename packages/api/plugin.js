
K.Plugin({
	name: 'api',
	filters: {
		placeItemApi: {
			fields: {
				//loc:1,
				name:1, checkins:1, createdAt:1, userId:1
			}
		}
	},
/*	TODO schemas: {
		user: {
			apiToken: ''
		}
	},*/
	settings: {
		"public": {
			"api": {
				"baseUrl": "/api",
				"urls": {
					"root": "/",
					"place": "/place/:name",
					"placeHist": "/place/:name/history",
					"placeCheckins": "/place/:name/checkins",
					"placeConvers": "/place/:name/convers",
					"searchPlace": "/search/place/:name",
					"searchUser": "/search/user/:name"
				}
			}
		},
		"api": {
			"enableRest": false,
			"jsonp": false,
			"headers": {
				//custom http headers for API response
				//"Access-Control-Allow-Origin": "*"
			}
		}
	}
});
