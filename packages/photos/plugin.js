
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
					//pass uploaded object to this method
					"method": "updateAvatar",
					"mimeFileType": {
						"image/png": true,
						"image/jpeg": true
					},
					//TODO rename in 'basepath' and 'baseurl'
					"url": "",
					"path": "",
					"maxFileSize": 5800000
				}
			}
		}
	}
});
