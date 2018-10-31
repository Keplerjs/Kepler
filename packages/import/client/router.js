
Router.map(function() {

	//TODO check isAdmin
	//
	this.route('panelImport', {
		path: '/admin/import',
		template: 'panelList',
		layoutTemplate: 'layoutMap',
		loadingTemplate: 'pageLoading',
		waitOn: function() {
			Session.set('showSidebar', true);
			return Meteor.subscribe('importsByUserId', K.Profile.id);
		},
		data: function() {
			return {
				title: i18n('label_imported'),
				className: 'imports',
				headerTemplate: 'inputFileImport',
				//headerData: place,	
				itemsTemplate: 'item_place_search',
				items: K.findPlacesImportByUserId(K.Profile.id).fetch(),
				//sortBy: 'lastMsg.updatedAt',
				//sortDesc: true
			};
		}
	});

});
