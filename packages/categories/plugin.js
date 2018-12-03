
K.Plugin({
	name: 'categories',
	templates: {
		panelSettings: 'panelSettings_cats',
		panelUser: 'panelUser_cats',
		panelPlace: {
			'panelPlace_cats': {order: -5 } //render after share plugin
		},
		panelPlaceEdit: 'panelPlaceEdit_cats',
		tabUser: {
			'panelUserAdmin_cats': {order:10}
		}
	},
	settings: {
		"public": {
			"categories": {
				//TODO "editable": false,
				"cats": {
					"place": {
						"bus": false,
						"car": false,
						"house": false,
						"parking": false,
					},
					"user": {
						"person": false,
						"animal": false,
						"robot": false,
					}
				}
			}
		}
	},
	schemas: {
		place: {
			cats: []
		},
		user: {
			cats: []
		}		
	},
	filters: {
		currentUser: {
			fields: {
				cats: 1
			}
		},
		friendPanel: {
			fields: {
				cats: 1
			}
		},	
		userPanel: {
			fields: {
				cats: 1
			}
		},		
		userItem: {
			fields: {
				cats: 1
			}
		},
		userSearch: {
			fields: {
				cats: 1
			}
		},		
		placePanel: {
			fields: {
				cats: 1
			}
		},
		placeItem: {
			fields: {
				cats: 1
			}
		},
		placeSearch: {
			fields: {
				cats: 1
			}
		}
	}
});