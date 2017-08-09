
K.Plugin({
	name: 'upload',
	placeholders: {
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
