
K.Plugin({
	name: 'events',
/*	templates: {
		panelPlace: 'panelPlace_events'
	},*/
	schemas: { 
		place: {
			events: [],	 //conversations in place
		},
		user: {
			events: [], 	   //ids conversations publics and privates
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
