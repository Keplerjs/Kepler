
K.Plugin({
	name: 'edit',
	templates: {
		panelPlaceEdit: {},
		//create new placeholder used from other plugins
		//
		panelProfile: {
			'panelProfile_edit': {order: 10 }
		},
		panelPlace: {
			'panelPlace_edit': {order:0}
		},
		tabUser: 'tabUser_edit',
		popupPlace: {
			'popupPlace_edit': {order:10}
		},
		popupCursor: 'popupCursor_edit'
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
					"draw": {
					  "enabled": true,
					  //leaflet draw config:
					  "draw": {
					    "marker": false,
					    "polyline": false,
					    "polygon": {
					      "allowIntersection": false,
					      "drawError": {
					        "color": "#399BCC",
					        "timeout": 1000
					      },
					      "shapeOptions": {
					        "color": "#3FAAA9",
					        "fillColor": "#3FAAA9",
					        "fillOpacity": 0.1
					      },
					      "showArea": true
					    },
					    "circlemarker": false,
					    "circle": {
					      "shapeOptions": {
					        "color": "#3FAAA9",
					        "fillColor": "#3FAAA9",
					        "fillOpacity": 0.1
					      }
					    }
					  },
					  "edit": {
					    "featureGroup": null,
					    "edit": true
					  }
					}
				}
			}
		}
	}
});
