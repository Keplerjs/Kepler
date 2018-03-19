
K.Plugin({
	name: 'theme',
	templates: {
		pageHome: 'pageHome_theme',
		footer: 'footer_theme'
	},
	settings: {
		"public": {
			"router": {
				"publicRoutes": {
					"pageAbout": 1
				}
			}
		}
	}
});
