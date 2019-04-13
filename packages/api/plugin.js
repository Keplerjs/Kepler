
K.Plugin({
	name: 'api',
	filters: {
		placeItemApi: {
			fields: {
				//loc:1,
				name:1, indoor:1, checkins:1, createdAt:1, userId:1
			}
		}
	},
	settings: {
		"api": {
			"baseUrl": "/api",
			"jsonp": false,
			"headers": {
				//custom http headers for API response
				//"Access-Control-Allow-Origin": "*"
			}
		}
	}
});
