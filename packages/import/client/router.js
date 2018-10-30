
Router.map(function() {

	//TODO check isAdmin
	//
	this.route('panelImport', {
		path: '/import',
		template: 'panelImport',
		layoutTemplate: 'layoutMap',
		loadingTemplate: 'pageLoading',
		waitOn: function() {
			Session.set('showSidebar', true);
		}
	});

});
