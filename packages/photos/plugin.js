
K.Plugin({
	name: 'photos',
	templates: {
		panelSettings: {
			'panelSettings_photos': { order:-10}
		}
	},
	settings: {
		"public": {
			"photos": {
				"maxFileSize": 5800000
			}
		},
		//define a targets used by plugin upload
		"photos": {

		},
		"upload": {
			"targets": {
				"photos_avatars": {
					"mimeFileType": ["image/png","image/jpeg"],
					//TODO rename in base path and baseurl
					"url": "",
					"path": "",
					"method": "resizePhoto",
					"maxFileSize": 5800000
				}
			}
		}
	}
});
