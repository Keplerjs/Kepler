
K.Plugin({
	name: 'edit',
	templates: {
		panelEdit: {},
		//create new placeholder used from other plugins
		//
		panelProfile: {
			'panelProfile_edit': {order: 10 }
		},
		panelPlace: 'panelPlace_edit',
		tabUser: 'tabUser_edit',
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
	/*settings: {
		public: {
		}
	}*/
});
