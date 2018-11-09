
K.Plugin({
	name: 'theme',
	templates: {
		pageHome: 'pageHome_theme',
		footer: {
			'footer_theme':{ order: 10 }
		}
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
