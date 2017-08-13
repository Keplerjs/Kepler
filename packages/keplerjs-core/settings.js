/*
	defautl Kepler settings
	use settings.json in root application having the same structure to overwrite the following values
*/

Meteor.startup(function() {
	_.deepExtend(K.settings, Meteor.settings);

	//enable in debugmode
	//if(Meteor.isServer)
	//	console.log("Settings: METEOR_SETTINGS='"+JSON.stringify(Meteor.settings)+"'");
});

Kepler.settings = {

	"public": {
		"lang": "en",
		"langs": {
			"it": "Italiano",
			"en": "English",
			//"es": "Español",			
			//"fr": "Français",
			//"de": "Deutsch"
		},
		"map": {
			"zoom": 16,
			"minZoom": 10,
			"maxZoom": 19,
			"center": [46.067246, 11.121511],
			//ITALY "maxBounds": [[36.282794, 5.361328], [47.542735, 21.071777]],

			"checkinMaxDist": 100,
			"bboxMinShift": 200,
			"gpsMinShift": 40,
			"showLocZoom": 16,
			
			"layer": "road",
			"layers": {
				"road": "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
				"landscape": "https://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png",			
				"transport": "https://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png"
			},
			"popup": {
				"autoPanPaddingTopLeft": [50, 50],
				"autoPanPaddingBottomRight": [50, 50],
				"closeButton": false,
				"minWidth": 120
			},
			"icon": {
				"iconSize": [30, 30],
				"iconAnchor": [15, 30],
				"popupAnchor": [0, -30]
			},
			"styles": {
				"default": { "color": "#b6f", "weight": 5, "opacity": 0.7 }
			}
		}
	},
	"router": {
		"public": {
			"about": 1
		}
	},
	"accounts": {
		"creation": true,
		"verifyEmail": false,
		/*
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

