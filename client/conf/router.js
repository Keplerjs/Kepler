
Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'page_loading'
});

Router.map(function() {

	this.route('root', {
		path: '/',
		template: 'page_map', 
		/*action: function() {
			
		//	this.render();
		}*/
	});

    this.route('intro', {
		path: '/intro',
		template: 'page_intro',
		onBeforeAction: function() {
			if(Meteor.user())
				Router.go('root');
			this.next();
		}
	});

	this.route('settings', {
		path: '/settings',
		template: 'page_map',
		onBeforeAction: function() {
			
			Climbo.profile.loadSettings();
//this.next();
			//if(this.ready())
			this.next();
		}
	});

	this.route('logout', {
		path: '/logout',
		template: 'page_intro',
		onBeforeAction: function () {
			Meteor.logout();
			this.next();
		}
	});
});

/*Router.onAfterAction(function() {

	setTimeout(function () {
		$("body").scrollTop(0);
	},100);

});*/
