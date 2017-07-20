
Router.map(function() {

	this.route('notifs', {
		path: '/notifications',
		template: 'panelList',
		layoutTemplate: 'layoutMap',
		data: function() {
			if(!this.ready()) return null;
			return {
				title: i18n('titles.notifications'),
				className: 'notifications',
				headerTemplate: 'list_notif_clean',		
				itemsTemplate: 'item_notif',
				items: _.map(K.Profile.data.notifs, function(text) {
					var type = _.shuffle(K.Notif._types)[0];
					return {
						type: type,
						msg: type+': '+text
					}
				})
			};
		}
	});
	
});