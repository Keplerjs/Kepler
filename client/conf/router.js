
Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'page_loading'
});

Router.onBeforeAction(function(pause){

 	if (!(Meteor.loggingIn() || Meteor.user())) {
		// pause();
		Router.go('intro');
	}

	this.next();

});//, {except: ['init', 'signin', 'signup', 'forgotpassword', 'resetPassword', 'verifyEmail']});

Router.map(function() {

	this.route('root', {
		path: '/',
		template: 'page_map'
	});

    this.route('intro', {
		path: '/intro',
		template: 'page_intro',
		onBeforeAction: function(){
			if (Meteor.user())
				Router.go('root');
			this.next();
		}
	});

	this.route('settings', {
		path: '/settings',
		template: 'page_map',
		action: function () {
			this.render('page_loading');
			
			Climbo.profile.loadSettings();

			if(this.ready())
				this.render();
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
