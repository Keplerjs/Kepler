
K.Plugin({
	name: 'admin',
	templates: {
		//new placeholder
		itemUserAdmin: {
			'itemUserAdmin_admin':{order:-10},
		},
		panelAdmin: 'panelAdmin_btn_users',		
		panelProfile: {
			'panelProfile_admin': {order:10},
			'panelUser_admin': {order:50},
		},
		panelPlaceEdit: {
			'panelPlace_admin': {order:50},
		},

		//TODO move it in a special admin page
	},
	schemas: {
		user: {
			isAdmin: 0
		}
	},
	filters: {
		currentUser: {
			fields: {
				isAdmin: 1
			}
		},
		friendPanel: {
			fields: {
				isAdmin: 1
			}
		},
		userPanel: {
			fields: {
				isAdmin: 1
			}
		}
	},
	settings: {
		"admin": {
			"emailOnNewUser": true,
			"adminUsers": ["admin"]
		}
	}
});
