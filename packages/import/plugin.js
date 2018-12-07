
K.Plugin({
	name: 'import',
	templates: {
		panelAdmin: 'panelAdmin_import',
		tabPlace: 'tabPlace_import'
	},
	filters: {
		placePanel: {
			fields: {
				import: 1
			}
		},
		placeItem: {
			fields: {
				import: 1
			}	
		}
	},
	schemas: {
		place: {
			import: {}
		}
	},	
	settings: {
		/**
		 * define a targets used by plugin upload
		 */
		"public": {
			"upload": {
				"targets": {
					"import_places": {
						"url": "",
						"maxFileSize": 2e+7,
						"mimeFileType": {
							"application/json": true,
							"application/geo+json": true
						}
					}
				}
			}
		},
		"upload": {
			"targets": {
				"import_places": {
					//pass uploaded object to this method
					"method": "importFile",
					"path": ""
				}
			}
		}
	}
});
