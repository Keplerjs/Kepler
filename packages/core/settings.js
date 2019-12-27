/*
	use settings.json in root application having the same structure to overwrite the following values
*/
/**
 * Default KeplerJs settings
 * @type {Object}
 */
Kepler.settings = {
	"public": {
		"queries": {
			/* defined in file /core/modules/queries.js */
		},		
		"templates": {
			/* defined in file /core-ui/settings.js */
		},
		"lang": "en",
		"langs": {
			"en": "English",
			"it": "Italiano",
			"de": "Deutsch",
			"sv": "Svenska",
			"es": "Español",
			"fr": "Français"
		},
		"router": {
			"enterRoute": "map",		//page where logged user enter
			//TODO auto redirect logged user
			"loginRoute": "pageHome",	//page where user is redirect is not logged(if current route is not public)
			"logoutRoute": "pageHome",	//
			"publicRoutes": {	//routes that don't need logged user
				"map": false,
				"mapLoc":false,
				"places": false,
				"placesNews": false,
				"placesNearby": false,
				"panelPlace": false,
				"placeMap": false,
				"placeGeom": false,
				"placeCheckins": false,
				
				"users": false,
				"usersNews": false,
				"panelUser": false,
			},
			"meta": {
				"gen": {
					"generator": "KeplerJs v"+K.version+" https://keplerjs.io"
				}
			},
			"link": {}			
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
			"maxBounds": [[-90, -180], [90, 180]],	//WORLD
			//"maxBounds": [[36.282794, 5.361328], [47.542735, 21.071777]],//ITALY 
			"dataMinZoom": 10,	//zoom limit to hide places and user
			"checkinAutomatic": true,
			"checkinGeometry": true,	//automatic checkin near by geometry, if false use only field loc
			"checkinMaxDist": 150,
			"bboxMinShift": 200,
			"bboxMaxDiagonal": 200000,	//max bounding box diangonal size for pub findPlacesByBBox in meters
			"bboxMaxResults": 50,
			"nearbyMaxDist": 20000,
			"gpsMinShift": 40,
			"showLocZoom": 16,
			"layer": "road",
			"layers": {
				//TODO rename in  "baseLayer":{...}...
				"road": "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			},
			"layerPlaces": {
				//TODO "query": "",
				"enabled": true,
				"cluster": true,
				"clusterOpts": {
					//https://github.com/Leaflet/Leaflet.markercluster#options
					"animate":false,
					"spiderfyDistanceMultiplier": 1,
					"spiderfyOnMaxZoom": false,
					"showCoverageOnHover": false,
					//"spiderLegPolylineOptions": {color:"#337ab7",weight:1},
					//"maxClusterRadius": 0,	
					"disableClusteringAtZoom": 12,
				}
			},
			"layerUsers": {
				"enabled": true
				//TODO implement cluster
			},
			"controls": {
				"zoom": {
					"enabled": true,
					"position": "bottomright"
				},
				"attrib": {
					"enabled": true,
					"position": "bottomleft",
					"prefix": "<a href=\"http://osm.org/copyright\" target=\"_blank\">&copy; osm.org</a>"
				},
				"scale": {
					"enabled": true,
					"position": "bottomleft",
					"imperial": false,
					"metric": true
				},					
				"gps": {
					"enabled": true,
					"position": "bottomright"
				},
				"switch": {
					"enabled": true,
					"position": "topright"
				},

			},
			"cursor": {
				"enabled": true,
				"popup": true
			},
			//TODO split options for places and users
			"popups": {
				"enabled": true,
				"autoPanPaddingTopLeft": [50, 50],
				"autoPanPaddingBottomRight": [50, 50],
				"closeButton": false,
				"minWidth": 120
			},
			"tooltips": {
				"enabled": true,
				"autoOpen": true,
				"direction": "auto",
				"sticky": true
			},
			"icons": {
				"iconSize": [30, 30],
				"iconAnchor": [15, 30],
				"popupAnchor": [0, -30]
			},
			"styles": {
				"default": { "color": "#b6f", "weight": 5, "opacity": 0.7 },
				"geometry": { "color": "#f90", "weight": 10, "opacity": 0.7 }
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
		},		
		"accounts": {
			"creation": true,
			"services": {
				"google": true,
				"github": true,
				"twitter": false,
				"facebook": true,
				"instagram": true,
				"openstreetmap": true
			},
			"ui": {
				"passwordSignupFields": "USERNAME_AND_OPTIONAL_EMAIL"
				//https://docs.meteor.com/api/accounts.html#Accounts-ui-config
			}
		}
	},
	"accounts": {
		"verifyEmail": false,
		"emailTemplates": {
			"from": "Admin <no-reply@example.com>"
		}
		/*
		"github": {
			//https://github.com/settings/developers
		}
		"openstreetmap": {
			"service": "openstreetmap",
			"consumerKey": "",
			"secret": ""
		}
		"facebook": {
			//https://developers.facebook.com/
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
