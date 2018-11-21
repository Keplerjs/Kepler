
K.Plugin({
	name: 'photos',
	templates: {
		tabPlace: {
			'tabPlace_photos': { order:-10 },
		},
		panelPlaceEdit: 'panelPlaceEdit_photos',		
		panelSettings: {
			'panelSettings_photos': { order:-10},
		}
	},
	settings: {
		/**
		 * define a targets used by plugin upload
		 */
		"upload": {
			"targets": {
				"photos_avatars": {
					//pass uploaded object to this method
					"method": "updateAvatar",
					"maxFileSize": 5800000,
					"mimeFileType": {
						"image/png": true,
						"image/jpeg": true
					},
					//TODO rename in 'basepath' and 'baseurl'
					"url": "",
					"path": ""
				},
				"photos_places": {
					//pass uploaded object to this method
					"method": "insertPlacePhotos",
					"maxFileSize": 5800000,
					"mimeFileType": {
						"image/png": true,
						"image/jpeg": true
					},
					//TODO rename in 'basepath' and 'baseurl'
					"url": "",
					"path": ""
				}
			}
		}
	}
});
