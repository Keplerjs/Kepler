
K.Plugin({
	name: 'import',
	templates: {
		panelProfile: {
			'panelProfile_import':{order: 10 }
		}
	},
	settings: {
		"public": {
			"import": {
				"maxFileSize": 2e+7 //20MB
			}
		},
		/*//TODO "import": {
			
		}*/
	}
});
