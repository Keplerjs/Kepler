
K.Plugin({
	name: 'notifs',
	templates: {
		navSidebar: 'navSidebar_notif',
		panelProfile: 'panelProfile_notif'
	},
	schemas: {
		user: {
			notifs: []
		}
	},
	filters: {
		currentUser: {
			fields: {
				notifs: 1
			}
		}
	}
});
