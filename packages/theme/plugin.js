
K.Plugin({
	name: 'theme',
	templates: {
		pageHome: 'pageHome_theme'
	},
	settings: {
		"public": {
			"router": {
				//https://github.com/VeliovGroup/Meteor-iron-router-title
				"link": {
					"favicon": {
						"rel": "shortcut icon",
						"href": "/packages/keplerjs_theme/assets/images/favicon.png" 
					},
					"image": {
						"rel": "image_src",
						"href": "/packages/keplerjs_theme/assets/images/logo-300.png"
					},
					"appicon": {
						"rel": "apple-touch-icon",
						"sizes": "128x128",
						"href": "/packages/keplerjs_theme/assets/images/logo-app.png"
					}	
				},
				"meta": {
					//TODO
					//	<meta name="apple-mobile-web-app-title" content="" />
					//	<meta name="apple-mobile-web-app-capable" content="yes" />
					//	<meta name="apple-mobile-web-app-status-bar-style" content="black" />
					//"msapplication": {
					//	"name": "msapplication-TileImage",
					//	"content": "/packages/keplerjs_theme/assets/images/apple-touch-icon-144.png",
					//}
				}
			}
		}
	}
});
