
K.Plugin({
	name: 'cats',
	placeholders: {
		panelSettings: 'panelSettings_cats',
		panelPlace: 'panelPlace_cats',
		panelUser: 'panelUser_cats'
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
	},
	schemas: {
		place: {
			cats: []
		},
		user: {
			cats: []
		}		
	}
});