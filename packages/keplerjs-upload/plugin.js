
K.Plugin({
	name: 'upload',
	templates: {
		panelSettings: 'panelSettings_upload'
	},
	settings: {
		"public": {
			"upload": {
				"maxFileSize": 5800000
			}
		},
		"upload": {
			"targets": {
				"avatars": {
					"url": "",
					"path": ""
				}
			}
		}
	}
});
