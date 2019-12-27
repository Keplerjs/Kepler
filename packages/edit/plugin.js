
var ifUserLogged = function() {
	return Meteor.user();
};

K.Plugin({
	name: 'edit',
	templates: {
		panelPlaceEdit: {},
		//create new placeholder used from other plugins
		//
		panelPlaceEdit: {
			'panelPlaceEdit_edit_creation': {order: -10},
			'panelPlaceEdit_edit_info': {order: -10},
			'panelPlaceEdit_edit_map': {order: -10},
			'panelPlaceEdit_edit_del': {order: -10}
		},
		panelProfile: {
			'panelProfile_edit': {order: 10 }
		},
		panelPlace: {
			'panelPlace_edit': {order:-5}
		},
		tabUser: 'tabUser_edit',
		popupPlace: {
			'popupPlace_edit': {order:10, show: ifUserLogged }
		},
		popupCursor: {
			'popupCursor_edit': {order:0, show: ifUserLogged }
		}
	},
	queries: {
		placesEdit: function() {
			var userId = Meteor.userId();
			return _.isString(userId) ? {userId: userId } : {};
		}
	},
	schemas: {
		place: {
			//TODO editedAt: '',//last edit date
			userId: null   //user creator of place
		},
		user: {
			places: []	   //places created by user
		}
	},
	filters: {
		currentUser: {
			fields: {
				places:1
			}
		},
		placePanel: {
			fields: {
				userId:1
			}
		},
		friendPanel: {
			fields: {
				places:1
			}
		},		
		userPanel: {
			fields: {
				places:1
			}
		}	
	},
	settings: {
		"public": {
			"map": {
				"controls": {
					"addButton": {
						"enabled": true,
						"position": "bottomright",
						"minZoom": 12
					},
					"draw": {
						"enabled": true,
						//leaflet draw config:
						"draw": {
							"marker": false,
							"circle": false,	
							"rectangle": false,
							"circlemarker": false,
							"polyline": {
								"allowIntersection": false,
								"shapeOptions": {}
								//TODO ...
							},					    
							"polygon": {
								"showArea": true,
								"shapeOptions": {},//default: K.settings.public.map.styles
								"allowIntersection": false,
								"drawError": {
									"color": "#ee0000",
									"timeout": 1000
								}
							}
						},
						"edit": {
							"edit": true,		
							"featureGroup": null//from place geometry
						}
					}
				}
			}
		}
	}
});
