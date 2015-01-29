
Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'page_loading'
});

Router.onBeforeAction(function(pause){

	if(!(Meteor.loggingIn() || Meteor.user()))
		Router.go('intro');

	this.next();

}, {except: ['intro', 'forgotpassword', 'resetPassword', 'verifyEmail']});


Router.map(function() {

	this.route('root', {
		path: '/',
		template: 'page_map', 
		onBeforeAction: function() {
			
			this.next();
		}
	});

    this.route('intro', {
		path: '/intro',
		template: 'page_intro',
		onBeforeAction: function() {
			
			this.next();
		}
	});

	this.route('settings', {
		path: '/settings',
		template: 'page_map',
		onBeforeAction: function() {
			
			Climbo.profile.loadSettings();
			//open Modal 

			this.ready();
			//this.next();
		}
	});

	this.route('logout', {
		path: '/logout',
		template: 'page_intro',
		onBeforeAction: function () {

			Climbo.profile.logout();
			
			Router.go('root');
		}
	});
});
