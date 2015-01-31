
Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'pageLoading'
});

Router.onBeforeAction(function(pause){

	if(!(Meteor.loggingIn() || Meteor.user()))
		Router.go('intro');

	this.next();

}, {except: ['pageIntro', 'forgotpassword', 'resetPassword', 'verifyEmail']});

//TODO Router.setTemplateNameConverter(function (str) { return str; });

/*
Template.panel_profile.events({
	'click .profile-btn-stars': function() {
		Climbo.profile.loadFavorites();
	},
	'click .profile-btn-notif': function() {
		Climbo.profile.loadNotif();
	},	
	'click .profile-btn-convers': function() {
		Climbo.profile.loadConvers();	
	}
});
	pageSettings: "Impostazioni profilo",
	pageFavorites: "Luoghi preferiti",
	pageConvers: "Messaggi",
	pageConversPlace: "Bacheca di",
	pageConversPrivate: "Conversazione privata",
	pageCheckins: "Climbers a",
	pageSectors: "Settori a"
*/


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
			
	/*		if(Meteor.loggingIn() || Meteor.user())
				Router.go('pageMap');*/

			this.next();
		}
	});

	this.route('pageSettings', {
		path: '/settings'
	});

	this.route('logout', {
		path: '/logout',
		onBeforeAction: function () {

			Climbo.profile.logout();
			
			Router.go('pageIntro');
		}
	});
});
