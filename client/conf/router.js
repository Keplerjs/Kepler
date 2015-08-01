
Router.configure({
	layoutTemplate: 'layoutMap',
	loadingTemplate: 'pageLoading'
});

Router.onBeforeAction(function(){

	if(!(Meteor.loggingIn() || Meteor.user()))
		Router.go('intro');

	this.next();

}, {except: ['intro', 'forgotPassword', 'resetPassword', 'verifyEmail']});

Router.onAfterAction(function(){

	var route = this.route.getName(),
		sidebarRoutes = ['profile','friends','place','user','placePanel'],
		sidebarRoutesNo = ['intro','map','placeMap']

	if( _.contains(sidebarRoutes, route) )
		$('#sidebar').removeClass('collapsed');

	else if( _.contains(sidebarRoutesNo, route) )
		$('#sidebar').addClass('collapsed');
});

Router.map(function() {

	this.route('map', {
		path: '/',
		layoutTemplate: 'layoutMap'
	});

    this.route('intro', {
		path: '/intro',
		template: 'pageIntro',
		layoutTemplate: 'layoutLogin'

	});

	this.route('profile', {
		path: '/profile',
		yieldRegions: {
			'panelProfile': {to: 'sidebar'},
		}
	});

	this.route('friends', {
		path: '/friends',
		yieldRegions: {
			'panelFriends': {to: 'sidebar'}
		}
	});

	this.route('placePanel', {
		path: '/place/:placeId',
		yieldRegions: {
			'panelPlace': {to: 'sidebar'}
		},
		waitOn: function() {
			return Meteor.subscribe('placeById', this.params.placeId);
		},
		data: function() {
			return {
				place: Climbo.newPlace(this.params.placeId)
			}
		}
	});

	this.route('placeMap', {
		path: '/place/:placeId/map',
		//layoutTemplate: 'layoutMap',
		waitOn: function() {
			return Meteor.subscribe('placesByIds', [this.params.placeId]);
		},
		action: function() {
			console.log(this)
			Climbo.newPlace(this.params.placeId).loadLoc();
		}
	});	
/*
	this.route('pagePlaceConvers', {
		path: '/place/:placeId/convers',
		template: 'pageList',
		waitOn: function() {
			return Meteor.subscribe('conversByPlace', this.params.placeId);
		},
		data: function() {
			return {
				//title: '<i class="icon icon-mes"></i> '+_.template(i18n('ui.titles.pagePlaceConvers'), self),
				className: 'pagePlaceConvers',
				header: {
					template: 'itemConverNew',
					data: {placeId: this.params.placeId}
				},
				itemsTemplate: 'itemConver',
				items: getConversByPlace(this.params.placeId).fetch(),
				sortDesc: true
			};
		}
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
			return Meteor.subscribe('conversByIds', Climbo.profile.data.convers);
		},
		data: function() {
			return {
				className: 'pageConvers',
				itemsTemplate: 'itemConver',
				items: getConversByIds(Climbo.profile.data.convers).fetch(),
				sortDesc: true
			};
		}
	});
	
	this.route('pageConver', {
		path: '/convers/:convId',
		template: 'pageConver',
		waitOn: function() {
			return Meteor.subscribe('converById', this.params.convId);
		},
		data: function() {
			var convData = getConverById(this.params.convId).fetch()[0];
			convData.title = convData.title || i18n('ui.titles.pageConver');
			convData.usersItems = _.map(convData.usersIds, Climbo.newUser);

			return convData;
		}
	});

	this.route('pageSettings', {
		path: '/settings'
	});*/

	this.route('logout', {
		path: '/logout',
		onBeforeAction: function () {

			Climbo.profile.logout();
			
			Router.go('pageIntro');
		}
	});
});
