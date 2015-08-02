
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
		sidebarRoutes = ['profile','friends','userPanel','placePanel'],
		sidebarRoutesNo = ['intro','map','placeMap']

	if( _.contains(sidebarRoutes, route) )
		$('#sidebar').removeClass('collapsed');

	else if( _.contains(sidebarRoutesNo, route) )
		$('#sidebar').addClass('collapsed');
});

Router.map(function() {

	this.route('map', {
		path: '/'
	});

    this.route('intro', {
		path: '/intro',
		template: 'pageIntro',
		layoutTemplate: 'layoutFull'

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
		},
		waitOn: function() {
			return Meteor.subscribe('friendsByIds', Climbo.profile.data.friends);
		},
		data: function() {
			return {
				friends: _.map(Climbo.profile.data.friends, Climbo.newUser)
			};
		}	
	});

	this.route('placePanel', {
		path: '/place/:placeId',
		template: 'panelPlace',
		yieldRegions: {
			'panelPlace': {to: 'sidebar'}
		},
		waitOn: function() {
			return Meteor.subscribe('placeById', this.params.placeId);
		},
		data: function() {
			return Climbo.newPlace(this.params.placeId);
		}
	});

	this.route('placeMap', {
		path: '/place/:placeId/map',
		//layoutTemplate: 'layoutMap',
		waitOn: function() {
			return Meteor.subscribe('placesByIds', [this.params.placeId]);
		},
		onBeforeAction: function() {
			Climbo.newPlace(this.params.placeId).loadLoc();
			this.next();
		}
	});

	this.route('userPanel', {
		path: '/user/:userId',
		template: 'panelUser',
		yieldRegions: {
			'panelUser': {to: 'sidebar'}
		},
		waitOn: function() {
			return Meteor.subscribe('userById', this.params.userId);
		},
		data: function() {
			return Climbo.newUser(this.params.userId);
		}
	});

	this.route('convers', {
		path: '/convers',
		template: 'pageList',
		layoutTemplate: 'layoutPage',	
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
	
/*	this.route('conver', {
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
	});*/

	this.route('favorites', {
		path: '/favorites',
		template: 'pageList',
		layoutTemplate: 'layoutPage',
		waitOn: function() {
			return Meteor.subscribe('placesByIds', Climbo.profile.data.favorites);
		},
		data: function() {
			return {
				className: 'pageFavorites',
				itemsTemplate: 'item_favorite',
				items: _.map(Climbo.profile.data.favorites, Climbo.newPlace),
				sortDesc: true,
				sortBy: 'name'
			};
		}
	});

	this.route('settings', {
		path: '/settings',
		template: 'pageSettings',
		layoutTemplate: 'layoutPage'
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
*/
	this.route('logout', {
		path: '/logout',
		onBeforeAction: function () {

			Climbo.profile.logout();
			
			Router.go('pageIntro');
		}
	});
});
