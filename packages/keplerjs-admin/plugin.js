
K.Plugin({
	name: 'admin',
	templates: {
		panelProfile: 'panelProfile_admin',
		panelPlace: 'panelPlace_admin',
		panelUser: 'panelUser_admin'
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
			"adminUsers": ["admin"]
		}
	}
});
