
K.Plugin({
	name: 'import',
	templates: {
		panelAdmin: 'panelAdmin_import'
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
