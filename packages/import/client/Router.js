
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
			return Meteor.subscribe('importsByUser', K.Profile.id);
		},
		onStop: function() {

		},
		data: function() {
			if(!this.ready()) return null;
			return {
				title: i18n('label_imported'),
				className: 'imports',
				headerTemplate: 'panelImport',
				itemsTemplate: 'itemImport',
				sortBy: 'name',
				items: _.map(K.Profile.data.imports, function(i) {
					return {
						name: i
					}
				})
			};
		}
	});

	this.route('panelImportName', {
		path: '/admin/import/:name',
		template: 'panelList',
		layoutTemplate: 'layoutMap',
		loadingTemplate: 'pageLoading',
		waitOn: function() {
			Session.set('showSidebar', true);
			return Meteor.subscribe('importsByName', this.params.name);
		},
		data: function() {
			if(!this.ready()) return null;
			return {
				title: i18n('label_imported')+': '+this.params.name,
				className: 'imports-name',
				itemsTemplate: 'itemPlaceImport',
				items: _.map(K.findPlacesByImportName(K.Profile.id, this.params.name).fetch(), function(p) {
					return K.placeById(p._id);
				})
			};
		}
	});	

});
