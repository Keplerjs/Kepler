
Router.map(function() {

	this.route('notifs', {
		path: '/notifications',
		template: 'panelList',
		layoutTemplate: 'layoutMap',
		waitOn: function() {
			Session.set('showSidebar', true);
		},
		data: function() {
			if(!this.ready()) return null;
			return {
				title: i18n('title_notifs'),
				className: 'notifications',
				headerTemplate: 'list_notif_clean',		
				itemsTemplate: 'item_notif',
				items: K.Profile.data.notifs
			};
		}
	});
	
});