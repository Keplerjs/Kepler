
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
		"public": {
			"import": {
				"fileFormats": {
					"application/json": true,
					"application/geo+json": true
				},
				"maxFileSize": 2e+7 //20MB
			}
		},
		/*//TODO "import": {
			
		}*/
	}
});
