
Router.map(function() {

	this.route('pageAbout', {
		path: '/about',
		template: 'pageAbout',
		layoutTemplate: 'layoutPage',
		loadingTemplate: 'pageLoading',
	});

	this.route('pageCredits', {
		path: '/credits',
		template: 'pageCredits',
		layoutTemplate: 'layoutPage',
		loadingTemplate: 'pageLoading',
	});

});