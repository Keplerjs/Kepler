
K.Plugin({
	name: 'admin',
	placeholders: {
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
		}
	},
	settings: {
		"admin": {
			"adminUsers": ["admin"]
		}
	}
});

AdminConfig = {
  collections: {
    Places: {}
  }
};