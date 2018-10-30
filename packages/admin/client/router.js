
Router.map(function() {

	this.route('panelAdmin', {
		path: '/admin',
		template: 'panelAdmin',
		layoutTemplate: 'layoutMap',
		loadingTemplate: 'pageLoading',
		waitOn: function() {
			Session.set('showSidebar', true);
		}
	});

});
