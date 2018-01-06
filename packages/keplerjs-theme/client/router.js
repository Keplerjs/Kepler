
Router.map(function() {

	this.route('pageAbout', {
		path: '/about',
		template: 'pageAbout',
		layoutTemplate: 'layoutPage',
		loadingTemplate: 'pageLoading',
	});

});