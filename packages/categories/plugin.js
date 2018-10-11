
K.Plugin({
	name: 'categories',
	templates: {
		//TODO panelSettings: 'panelSettings_cats',
		//TODO panelUser: 'panelUser_cats',
		//markerPlace: 'markerPlace_cats',
		//markerUser: 'markerUser_cats',
		panelPlace: {
			'panelPlace_cats': {order: -5 } //after share plugin
		}
	},
	settings: {
		"public": {
			"categories": {
				//examples of cats
				"editable": false,
				"cats": {
					"place": [
						"bus",
						"car",
						"house",
						"office",
						"market",
						"parking",
					],
					"user": [
						"person",
						"animal",
						"robot",
					]
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