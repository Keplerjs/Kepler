
Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'pageLoading'
});

Router.onBeforeAction(function(){

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
/*		,action: function () {
			if(this.ready())
				this.render();
			else
				this.render('pageLoading');
		}*/
	});

    this.route('pageIntro', {
		path: '/intro'
	});

	this.route('pageNotifs', {
		path: '/notifications',
		template: 'pageList',
		waitOn: function() {
			return Climbo.profile.loadNotifs();
		},
		data: function() {
			return {
				className: 'pageNotifs',
				itemsTemplate: 'item_notif',
				items: Climbo.profile.notifs
			};
		}
	});
	
	this.route('pageFavorites', {
		path: '/favorites',
		template: 'pageList',
		waitOn: function() {
			return Climbo.profile.loadFavorites();
		},
		data: function() {
			return {
				className: 'pageFavorites',
				itemsTemplate: 'item_favorite',
				items: Climbo.profile.favorites,
				sortDesc: true,
				sortBy: 'name'
			};
		}
	});
	
	this.route('pageConvers', {
		path: '/convers',
		template: 'pageList',
		waitOn: function() {
			return Climbo.profile.loadConvers();
		},
		data: function() {
			return {
				className: 'pageConvers',
				itemsTemplate: 'item_conver',				
				items: Climbo.profile.convers,
				sortDesc: true
			};
		}
	});

	this.route('pageConver', {
		path: '/convers/:convId',
		template: 'pageList',
		onBeforeAction: function() {
			Climbo.convers.show(this.params.convId);
		}
/*		,data: function() {
			return Tickets.findOne(this.params.ticketId);
		}*/
	});

	this.route('pagePlaceConvers', {
		path: '/place/:placeId/convers',
		template: 'pageList',
		waitOn: function() {
			return Meteor.subscribe('conversByPlace', this.params.placeId);
		},
		data: function() {
			return {
				//title: '<i class="icon icon-mes"></i> '+_.template(Climbo.i18n.ui.titles.pagePlaceConvers, self),
				//header: {placeId: self.id, tmpl: Template.conver_new},
				className: 'pagePlaceConvers',
				itemsTemplate: 'item_conver',
				items: getConversByPlace(this.params.placeId).fetch(),
				sortDesc: true
			};
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
