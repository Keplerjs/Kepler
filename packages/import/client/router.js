
Router.map(function() {

	//TODO check isAdmin
	//
	this.route('panelImport', {
		path: '/import',
		template: 'panelList',
		layoutTemplate: 'layoutMap',
		loadingTemplate: 'pageLoading',
		waitOn: function() {
			Session.set('showSidebar', true);
			return Meteor.subscribe('importsByUserId', K.Profile.id);
		},
		data: function() {
			if(!this.ready()) return null;
			return {
				title: i18n('label_imported'),
				className: 'imports',
				headerTemplate: 'formImport',
				//headerData: place,
				itemsTemplate: 'item_place_search',
				//items: K.findPlacesImportByUserId(K.Profile.id).fetch(),
				items: _.map(K.findPlacesImportByUserId(K.Profile.id).fetch(), function(p) {
					return K.placeById(p._id);
				})
				//sortBy: 'lastMsg.updatedAt',
				//sortDesc: true
			};
		}
	});

});
