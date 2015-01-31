
Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'pageLoading'
});

Router.onBeforeAction(function(pause){

	if(!(Meteor.loggingIn() || Meteor.user()))
		Router.go('intro');

	this.next();

}, {except: ['pageIntro', 'forgotpassword', 'resetPassword', 'verifyEmail']});


Router.map(function() {

	this.route('pageMap', {
		path: '/',
		onBeforeAction: function() {
			
			this.next();
		}
	});

    this.route('pageIntro', {
		path: '/intro',
		onBeforeAction: function() {
			
			this.next();
		}
	});

	this.route('settings', {
		path: '/settings',
		template: 'pageMap',
		onBeforeAction: function() {
			
			Climbo.profile.loadSettings();
			//open Modal 

			//this.ready();
			this.next();
		}
	});

	this.route('logout', {
		path: '/logout',
		onBeforeAction: function () {

			Climbo.profile.logout();
			
			Router.go('pageIntro');
		}
	});
});
