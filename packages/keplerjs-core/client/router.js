
//TODO use https://github.com/DerMambo/ms-seo

Router.configure({
	loadingTemplate: 'panelLoading',
	notFoundTemplate: 'page404'
});

Router.waitOn(function() {

	if(!Meteor.user()) {
		if(Meteor.loggingIn())
			this.render(this.loadingTemplate);
		else
			Router.go('home');
	}
	else {
		return Meteor.subscribe('currentUser', function() {
			K.Profile.init(function() {
				
				if(K.Admin.isMe())
					K.Admin.loadMethods();
			});
		});
	}
});

Router.onAfterAction(function() {
	var self = this;

	document.title = i18n('titles.'+this.route.getName()) || _.str.capitalize(this.route.getName());

	if(this.route.options.layoutTemplate==='layoutMap') {

		//PATCH render map after template layoutMap is rendered
		Meteor.setTimeout(function() {
			
			var map$ = $('#map')[0];

			if( self.ready() && map$ && K.Profile.data) {

				K.Map.init(map$, K.Profile.getOpts('map'), function() {
					//TODO plugins hook event
				});
			}
		}, 10);
	}
	else
		K.Map.destroy();

});

Router.map(function() {

	this.route('home', {
		path: '/home',
		layoutTemplate: 'layoutFull',
		loadingTemplate: 'pageLoading',
	});

	this.route('logout', {
		path: '/logout',
		onBeforeAction: function () {
			K.Profile.logout();
			K.Map.destroy();
			Router.go('home');
		}
	});

	//MAP PAGES

	this.route('root', {
		path: '/',
		template: 'empty',
		layoutTemplate: 'layoutMap',
		data: { hideSidebar: true }
	});

	this.route('profile', {
		path: '/profile',
		template: 'panelProfile',
		layoutTemplate: 'layoutMap',
		data: function() {
			return K.Profile.user;
		}
	});

	this.route('panelSettings', {
		path: '/settings',
		template: 'panelSettings',
		layoutTemplate: 'layoutMap',
		loadingTemplate: 'pageLoading',
		data: function() {
			return Meteor.user();
		}
	});

//TODO use panel list
/*	this.route('panelSettingsBlock', {
		path: '/settings/blocked',
		layoutTemplate: 'layoutPage',
		loadingTemplate: 'pageLoading',
		waitOn: function() {
			return Meteor.subscribe('usersByIds', K.Profile.data.usersBlocked );
		}
	});	*/

	this.route('friends', {
		path: '/friends',
		template: 'panelList',
		layoutTemplate: 'layoutMap',
		waitOn: function() {
			if(K.Profile.data)
			return Meteor.subscribe('friendsByIds', K.Profile.data.friends);
		},
		data: function() {
			if(!this.ready()) return null;
			return {
				title: i18n('titles.friends'),
				className: 'friends',			
				headerTemplate: 'search_user',
				itemsTemplate: 'item_user_friend',
				items: _.map(K.Profile.data.friends, K.userById)
			};
		}	
	});

	this.route('places', {
		path: '/places',
		template: 'panelList',
		layoutTemplate: 'layoutMap',
		data: function() {
			if(!this.ready()) return null;

			var bbox = K.Map.getBBox(),
				places = K.findPlacesByBBox(bbox).fetch();

			return {
				title: i18n('titles.placesNearby'),
				className: 'placesNearby',
				headerTemplate: 'search_place',
				itemsTemplate: 'item_place_search',
				items: _.map(places, function(place) {
					var p = K.placeById(place._id);
					if($(p.marker._icon).is(':visible'))
						return p.rData();
				})
			};
		}
	});	

	this.route('placesNews', {
		path: '/places/news',
		template: 'panelList',
		layoutTemplate: 'layoutMap',
		waitOn: function() {
			return Meteor.subscribe('placesByDate');
		},
		data: function() {
			if(!this.ready()) return null;
			
			var places = K.findPlacesByDate().fetch();

			return {
				title: i18n('titles.placesNews'),
				className: 'placesNews',
				headerTemplate: 'search_place',
				itemsTemplate: 'item_place_search',
				items: _.map(places, function(place) {
					return K.placeById(place._id);
				})
			};
		}
	});		

	this.route('favorites', {
		path: '/favorites',
		template: 'panelList',
		layoutTemplate: 'layoutMap',
		waitOn: function() {
			return Meteor.subscribe('placesByIds', K.Profile.data.favorites);
		},
		data: function() {
			if(!this.ready()) return null;
			return {
				title: i18n('titles.favorites'),
				className: 'favorites',
				itemsTemplate: 'item_place_favorite',
				items: _.map(K.Profile.data.favorites, function(id) {
					var place = K.placeById(id);
					place.update();
					return place.rData();
				}),
				sortBy: 'name'
			};
		}
	});

	this.route('hist', {
		path: '/history',
		template: 'panelList',
		layoutTemplate: 'layoutMap',
		waitOn: function() {
			return Meteor.subscribe('placesByIds', K.Profile.data.hist);
		},
		data: function() {
			if(!this.ready()) return null;
			return {
				title: i18n('titles.histplaces'),
				className: 'history',
				itemsTemplate: 'item_place_favorite',
				items: _.map(K.Profile.data.hist, K.placeById)
			};
		}
	});

	this.route('panelPlace', {
		path: '/place/:placeId',
		layoutTemplate: 'layoutMap',
		waitOn: function() {
			return Meteor.subscribe('placeById', this.params.placeId);
		},
		data: function() {
			if(!this.ready()) return null;
			var place = K.placeById( this.params.placeId );
			return place.rData();
		}
	});

	this.route('placeMap', {
		path: '/place/:placeId/map',
		template: 'empty',
		layoutTemplate: 'layoutMap',
		waitOn: function() {
			return Meteor.subscribe('placeById', this.params.placeId);
		},
		onAfterAction: function() {
			if(!this.ready()) return null;

			var place = K.placeById( this.params.placeId );

			if(place)
				place.showLoc();
		},
		data: { hideSidebar: true }
	});

	this.route('placeCheckins', {
		path: '/place/:placeId/checkins',
		template: 'panelList',
		layoutTemplate: 'layoutMap',
		waitOn: function() {
			return Meteor.subscribe('usersByPlace', this.params.placeId);
		},
		data: function() {
			if(!this.ready()) return null;
			var place = K.placeById(this.params.placeId);
			return place && {
				title: i18n('titles.checkins', place.name),
				className: 'checkins',
				itemsTemplate: 'item_user',
				items: _.map(place.checkins, function(id) {
					return K.userById(id);
				})
			};
		}
	});

	this.route('panelUser', {
		path: '/user/:userId',
		layoutTemplate: 'layoutMap',
		waitOn: function() {
			if(this.params.userId===Meteor.userId())
				Router.go('profile');
			else
				return Meteor.subscribe('userById', this.params.userId);
		},
		data: function() {
			if(this.ready()) {
				var user = K.userById(this.params.userId);
				user.update();
				return user.rData();
			}
			else
				this.render(this.loadingTemplate);
		}
	});

	this.route('userMap', {
		path: '/user/:userId/map',
		template: 'empty',
		layoutTemplate: 'layoutMap',
		waitOn: function() {
			return Meteor.subscribe('friendsByIds', [this.params.userId]);
		},
		onAfterAction: function() {
			var user = K.userById( this.params.userId );

			if(user)
				user.showLoc();
		},		
		data: { hideSidebar: true }
	});	

});
