
K.Plugin({
	name: 'favorites',
	templates: {
		panelProfile: 'panelProfile_favorites',
		tabUser: 'tabUser_favorites',
		itemPlace: 'itemPlace_favorites'
	},
	schemas: {
		place: {
			rank: 0		   //sum of all users's favorites
		},
		user: {
			favorites: []
		}
	},
	filters: {
		currentUser: {
			fields: {
				favorites:1
			}
		},
	//Users
		friendPanel: {
			fields: {
				favorites:1
			}
		},
	//Places
		placePanel: {
			fields: {
				rank:1
			}
		},
		placeItem: {
			fields: {
				rank:1
			}
		},
		placeSearch: {
			fields: {
			    rank:1
			}
		}	
	}
});
