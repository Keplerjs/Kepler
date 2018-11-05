
K.Plugin({
	name: 'categories',
	templates: {
		//TODO panelSettings: 'panelSettings_cats',
		//TODO tabUser: 'tabUser_cats',
		panelPlace: {
			'panelPlace_cats': {order: -5 } //render after share plugin
		},
		panelEdit: 'panelEdit_cats'
	},
	settings: {
		"public": {
			"categories": {
				//TODO "editable": false,
				"cats": {
					"place": {
						"bus": true,
						"car": true,
						"house": true,
						"parking": true,
					},
					"user": {
						"person": true,
						"animal": true,
						"robot": true,
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