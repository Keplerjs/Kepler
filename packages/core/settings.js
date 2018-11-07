/*
	Default KeplerJs settings

	use settings.json in root application having the same structure to overwrite the following values

	//TODO remove properties outside public in client K.settings
*/
Meteor.startup(function() {
	_.deepExtend(K.settings, Meteor.settings);
	//TODO uncomment when exists a 'debug mode'
	if(Meteor.isServer)
		console.log("Settings: METEOR_SETTINGS='"+JSON.stringify(Meteor.settings)+"'");
});

Kepler.settings = {

	"public": {
		"lang": "en",
		"langs": {
			"en": "English",
			"it": "Italiano",
			"de": "Deutsch",
			"sv": "Svenska",
			"es": "Español",
			"fr": "Français",
		},
		"templates": {
			//centralized templaes configurations
		},
		"profile": {
			"awayTime": 10000,
			"awayOnWindowBlur": true
		},
		"map": {
			"zoom": 5,
			"minZoom": 3,
			"maxZoom": 19,
			"center": [46.067246, 11.121511],
			//ITALY "maxBounds": [[36.282794, 5.361328], [47.542735, 21.071777]],

			"dataMinZoom": 10,	//zoom limit to hide places and user

			"checkinMaxDist": 150,
			"bboxMinShift": 200,
			"bboxMaxDiagonal": 200000,	//max bounding box diangonal size for pub findPlacesByBBox in meters
			"bboxMaxResults": 50,
			"nearbyMaxDist": 20000,
			"gpsMinShift": 40,
			"showLocZoom": 16,

			"layer": "road",
			"layers": {
				"road": "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			},
			"popup": {
				"autoPanPaddingTopLeft": [50, 50],
				"autoPanPaddingBottomRight": [50, 50],
				"closeButton": false,
				"minWidth": 120
			},
			"tooltip": {
				"direction": "auto",
				"sticky": true
			},
			"icon": {
				"iconSize": [30, 30],
				"iconAnchor": [15, 30],
				"popupAnchor": [0, -30]
			},
			"styles": {
				"default": { "color": "#b6f", "weight": 5, "opacity": 0.7 }
			}
		},
		"router": {
			"publicRoutes": {
				"about": 1
			}
		},
		"accounts": {
			"creation": true,
			"services": {
				"google": true,
				"github": true,
				"twitter": false,
				"facebook": true,
				"openstreetmap": true
			},
			"ui": {
				"passwordSignupFields": "USERNAME_AND_OPTIONAL_EMAIL"
				//https://docs.meteor.com/api/accounts.html#Accounts-ui-config
			}
		},
		"ga": {
			//https://github.com/reywood/meteor-iron-router-ga
			"id": "UA-XXXX-Y",
			/*"create": {
                "cookieDomain": "example.com",
                "cookieName": "my_ga_cookie",
                "cookieExpires": 3600
            },
            "set": {
                "forceSSL": true,
                "anonymizeIp": true
            },*/
            "trackUserId": false
		}
	},
	"accounts": {
		"verifyEmail": false,
		"emailTemplates": {
			"from": "Admin <no-reply@example.com>"
		}
		/*
		"openstreetmap": {
			"service": "openstreetmap",
			"consumerKey": "",
			"secret": ""
		}
		"facebook": {
			//http://developers.facebook.com/docs/authentication/permissions/
			"service": "facebook",
			"appId": "",
			"secret": ""
		},
		"google": {
			//https://console.developers.google.com/
			"service": "google",
			"clientId": "",
			"secret": ""
		},
		"twitter": {
			"service": "twitter",
			"consumerKey": "",
			"secret": ""
		}*/
	}
};
