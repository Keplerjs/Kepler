
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
		"upload": {
			"targets": {
				"import_places": {
					//pass uploaded object to this method
					"method": "importFile",
					"maxFileSize": 2e+7,
					"mimeFileType": {
						"application/json": true,
						"application/geo+json": true
					},
					//TODO rename in 'basepath' and 'baseurl'
					"url": "",
					"path": ""
				}
			}
		}
	}
});
