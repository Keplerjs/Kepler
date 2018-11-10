
K.Plugin({
	name: 'upload',
	templates: {
		panelSettings: {
			'panelSettings_upload': { order:-10}
		}
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
