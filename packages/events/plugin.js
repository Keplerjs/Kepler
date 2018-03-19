
K.Plugin({
	name: 'events',
/*	templates: {
		panelPlace: 'panelPlace_events'
	},*/
	schemas: { 
		place: {
			events: [],	 //events in place
		},
		user: {
			events: [], 	   //ids events publics and privates
		}
	},
	filters: {
		currentUser: {
			fields: {
				events:1
			}
		},
		placePanel: {
			fields: {
				events:1
			}
		},
		userPanel: {
			fields: {
				events:1
			}
		},
		friendPanel: {
			fields: {
				events:1 
			}
		}		
	}
});
