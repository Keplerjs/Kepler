
K.Plugin({
	name: 'upload',
	settings: {
		"public": {
			"upload": {
				"maxFileSize": 5800000
			}
		},
		"upload": {
			"targets": {
				"example": {
					//TODO rename in base path and baseurl
					"url": "",
					"path": "",
					"method": ""
				}
			}
		}
	}
});
