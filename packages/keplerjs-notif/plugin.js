
K.Plugin({
	name: 'notif',
	placeholders: {
		sidebarNav: 'sidebarNav_notif',
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
/*	settings: {
		public: {
			"maxNotifList": 5
		}
	}*/
});
