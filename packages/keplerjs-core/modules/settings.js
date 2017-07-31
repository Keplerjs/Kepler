/*
	defautl Kepler settings
	use settings.json in root application having the same structure to overwrite the following values
*/
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
			"zoom": 10,
			"minZoom": 10,
			"maxZoom": 19,
			"center": [42.047801, 13.250885],
			"maxBounds": [[36.282794, 5.361328], [47.542735, 21.071777]],

			"checkinMaxDist": 500,
			"bboxMinShift": 200,
			"gpsMinShift": 40,
			"showLocZoom": 16,
			
			"layer": "road",
			"layers": {
				"road": "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
				"landscape": "https://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png",			
				"transport": "https://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png"
			},
			"styles": {
				"default": { "color": "#b6f", "weight": 5, "opacity": 0.7 },
				"access":  { "color": "#66f", "weight": 8, "opacity": 0.7 },
				"poiLine": { "color": "#f33", "weight": 4, "opacity": 0.7, "dashArray": "1,6" },
				"placeCircle": { "color": "#f33", "weight": 4, "opacity": 0.7, "radius": 15 }
			}	
		}
	},
	"accounts": {
		"creation": true,
		"facebook": {
			"service": "facebook",
			"appId": "",
			"secret": ""
		},
		"google": {
			"service": "google",
			"clientId": "",
			"secret": ""
		},
		"twitter": {
			"service": "twitter",
			"consumerKey": "",
			"secret": ""			
		}		
	}	
};

