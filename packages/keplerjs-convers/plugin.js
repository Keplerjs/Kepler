
K.Plugin({
	name: 'convers',
	templates: {
		navSidebar: 'navSidebar_conver',
		panelProfile: 'panelProfile_conver',
		panelUser: 'panelUser_conver',
		popupPlace: 'popupPlace_conver',
		itemPlace: 'itemPlace_conver',
		itemUser: 'itemUser_conver'	
	},
	schemas: {
		place: {
			convers: [],	 //conversations in place
		},
		user: {
			convers: [], 	   //ids conversations publics and privates
		},
		conver: {
			createdAt: null,
			title: '',         //Topic for the place wall or subject for the private convers
			targetId: '',      //if null is a private users convers		
			targetType: '',	   //type of target: user, place, event, pois		
			userId: '',        //owner/sender of conversation		
			usersIds: [],      //participants users
			lastMsg: null      //include last msg of conversation
		},
		converMsg: {
			updatedAt: '',	
			convId: '',
			userId: '',
			body: ''
		}		
	},
	filters: {
		currentUser: {
			fields: {
				convers: 1
			}
		},
		placePanel: {
			fields: {
				convers: 1
			}
		},
		placeItem: {
			fields: {
				convers: 1
			}
		},
		converPanel: {
			fields: {
				title:1, targetId:1, targetType:1, userId:1, usersIds:1, lastMsg:1, createdAt:1
			}
		},
		converItem: {
			fields: {
				title:1, targetId:1, targetType:1, userId:1, usersIds:1, lastMsg:1, createdAt:1
			}
		}		
	}
});