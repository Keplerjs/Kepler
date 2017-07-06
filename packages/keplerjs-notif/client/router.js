
Router.map(function() {

	this.route('notif', {
		path: '/notifications',
		template: 'panelList',
		data: function() {
			if(!this.ready()) return null;
			return {
				title: i18n('titles.notifications'),
				className: 'notifications',
				headerTemplate: 'list_notif_clean',		
				itemsTemplate: 'item_notif',
				items: _.map(K.Profile.data.notif, function(text) {
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