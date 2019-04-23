
K.Plugin({
	name: 'upload',
	settings: {
		"public": {
			"upload": {
				"maxFileSize": 5800000,
				"targets": {
					/* example "photos_places": {
						"url": "/static/photos/",
						"maxFileSize": 8800000,
						"mimeFileType": {
							"image/png": true,
							"image/jpeg": true
						}
					}*/
				}
			}
		},
		"upload": {
			"targets": {
				/* example "photos_places": {
					//pass uploaded object to this method
					"method": "updatePlacePhoto",
					"path": ""
				}*/
			}
		}
	}
});
