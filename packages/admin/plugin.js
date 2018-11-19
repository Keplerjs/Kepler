
K.Plugin({
	name: 'admin',
	templates: {
		panelAdmin: {},
		panelProfile: {
			'panelProfile_admin': {order:10}
		},
		panelPlace: 'panelPlace_admin',
		panelUser: {
			'panelUser_admin': {order:0}
		}
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
