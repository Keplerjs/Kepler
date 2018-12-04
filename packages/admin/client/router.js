
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

	this.route('panelAdminUsers', {
		path: '/admin/users',
		template: 'pageAdminUsers',
		layoutTemplate: 'layoutPage',
		loadingTemplate: 'pageLoading',
		waitOn: function() {
			Session.set('showSidebar', true);
		}
	});
});
