
Router.map(function() {

/* unuseful	this.route('main', {
		path: '/',
		onBeforeAction: function () {
			//Router.go();
		}
	});*/

	this.route('pageHome', {
		path: '/',
		template: 'pageHome',
		layoutTemplate: 'layoutFull',
		loadingTemplate: 'pageLoading',
	});

	this.route('logout', {
		path: '/logout',
		onBeforeAction: function () {
			K.Profile.logout();
			K.Map.destroy();
			Router.go(K.settings.public.router.logoutRoute);
		}
	});

	this.route('map', {
		path: '/map/',	//PATCH use '/' to end otherwise gen a console error
		template: 'empty',
		layoutTemplate: 'layoutMap',
		waitOn: function() {
			Session.set('showSidebar', false);
			/*var bb = K.Map.getBBox();
			if(K.Util.valid.bbox(bb))
				return Meteor.subscribe('placesByBBox', bb);*/
		},
		onStop: function() {
			if(K.Map.controls.gps)
				K.Map.controls.gps.deactivate();
		},
		/*data: function(){
			var places = K.findPlacesByBBox(K.Map.getBBox()).fetch();
			return _.map(_.pluck(places,'_id'), K.placeById)
		}*/
	});

	this.route('mapLoc', {
		path: '/map/:lat,:lng',
		template: 'empty',
		layoutTemplate: 'layoutMap',
		waitOn: function() {
			Session.set('showSidebar', false);
		},
		onAfterAction: function() {
			if(!this.ready()) return null;

			var loc = K.Util.geo.locRound([this.params.lat, this.params.lng]);

			K.Map.showLoc(loc, function() {
				K.Map.showCursor(loc);
				Router.go('map');
			});
		}
	});

	//TODO
/*	this.route('mapSearch', {
		path: '/map/search/:query',
		template: 'panelSearch',
		layoutTemplate: 'layoutMap',
		waitOn: function() {
			Session.set('showSidebar', true);
		},
		data: function() {
			if(!this.ready()) return null;

			return {
				title: i18n('title_search'),
				className: 'search',
				headerTemplate: 'search_items',
				itemsTemplate: 'item_place_search',
				items: _.map(places, function(place) {
					return K.placeById(place._id);
				})
			};
		}
	});*/

	this.route('profile', {
		path: '/profile',
		template: 'panelProfile',
		layoutTemplate: 'layoutMap',
		waitOn: function() {
			Session.set('showSidebar', true);
		},
		data: function() {
			return K.Profile.user;
		}
	});

	this.route('panelSettings', {
		path: '/settings',
		template: 'panelSettings',
		layoutTemplate: 'layoutMap',
		loadingTemplate: 'pageLoading',
		waitOn: function() {
			Session.set('showSidebar', true);
		},
		data: function() {
			return Meteor.user();
		}
	});

//TODO use panel list
	this.route('panelSettingsBlock', {
		path: '/settings/blocked',
		template: 'panelList',
		layoutTemplate: 'layoutMap',
		loadingTemplate: 'pageLoading',
		waitOn: function() {
			Session.set('showSidebar', true);
			return Meteor.subscribe('usersByIds', K.Profile.data.usersBlocked );
		},
		data: function() {
			if(!this.ready()) return null;
			return {
				title: i18n('title_settingsBlocked'),
				className: 'settingsBlocked',
				itemsTemplate: 'item_user_block',
				items: _.map(K.Profile.data.usersBlocked, K.userById)
			};
		}
	});

	this.route('users', {
		path: '/users',
		onBeforeAction: function () {
			Router.go('usersNews');
			//this.redirect('/users/news');
		}
	});

	this.route('usersNews', {
		path: '/users/news',
		template: 'panelList',
		layoutTemplate: 'layoutMap',
		waitOn: function() {
			Session.set('showSidebar', true);
			return Meteor.subscribe('usersByDate');
		},
		data: function() {
			if(!this.ready()) return null;
			var users = K.findUsersByDate().fetch(),
				userIds = _.pluck(users,'_id');
			return {
				title: i18n('title_usersNews'),
				className: 'usersNews',			
				headerTemplate: 'panelUsers',
				itemsTemplate: 'item_user_search',
				items: _.map(userIds, K.userById)
			};
		}	
	});

	this.route('friends', {
		path: '/friends',
		template: 'panelList',
		layoutTemplate: 'layoutMap',
		onAfterAction: function () {
			if(!K.Profile.ready)
				Router.go('users');

			this.ready();
		},
		waitOn: function() {
			Session.set('showSidebar', true);
			return Meteor.subscribe('friendsByIds', K.Profile.data.friends);
		},
		data: function() {
			if(!this.ready()) return null;
			var users = K.findFriendsByIds(K.Profile.data.friends).fetch(),
				userIds = _.pluck(users,'_id');
			return {
				title: i18n('title_friends'),
				className: 'friends',			
				headerTemplate: 'panelUsers',
				itemsTemplate: 'item_user_friend',
				items: _.map(userIds, K.userById),
				sortBy: function(user) {
					var status = user.status || 'offline',
						ords = ['online','away','offline'];
					return ords.indexOf(status);
				}
			};
		}
	});

	this.route('places', {
		path: '/places/',
		onBeforeAction: function () {
			Router.go('placesNews');
			//this.redirect('/users/news');
		}
	});

	this.route('placesNearby', {
		path: '/places/nearby',
		template: 'panelList',
		layoutTemplate: 'layoutMap',
		waitOn: function() {
			Session.set('showSidebar', true);
			if(!K.Map.ready()) return null;
			var loc = K.Map.getCenter();
			return Meteor.subscribe('placesByNearby', loc);
		},
		data: function() {
			if(!this.ready() || !K.Map.ready()) return null;

			var loc = K.Map.getCenter(),
				places = K.findPlacesByNearby(loc).fetch();

			return {
				title: i18n('title_placesNearby'),
				className: 'placesNearby',
				headerTemplate: 'panelPlaces',
				itemsTemplate: 'item_place_search',
				items: _.map(places, function(place) {
					return K.placeById(place._id);
				})
			};
		}
	});

	this.route('placesNews', {
		path: '/places/news',
		template: 'panelList',
		layoutTemplate: 'layoutMap',
		waitOn: function() {
			Session.set('showSidebar', true);
			return Meteor.subscribe('placesByDate');
		},
		data: function() {
			if(!this.ready()) return null;
			
			var places = K.findPlacesByDate().fetch();

			return {
				title: i18n('title_placesNews'),
				className: 'placesNews',
				headerTemplate: 'panelPlaces',
				itemsTemplate: 'item_place_search',
				items: _.map(places, function(place) {
					return K.placeById(place._id);
				})
			};
		}
	});

	this.route('hist', {
		path: '/history',
		template: 'panelList',
		layoutTemplate: 'layoutMap',
		waitOn: function() {
			Session.set('showSidebar', true);
			return Meteor.subscribe('placesByIds', K.Profile.data.hist);
		},
		data: function() {
			if(!this.ready()) return null;
			return {
				title: i18n('title_histplaces'),
				className: 'history',
				itemsTemplate: 'item_place',
				items: _.map(K.Profile.data.hist, K.placeById)
			};
		}
	});

	this.route('panelPlace', {
		path: '/place/:placeId',
		layoutTemplate: 'layoutMap',
		waitOn: function() {
			Session.set('showSidebar', true);
			return Meteor.subscribe('placeById', this.params.placeId);
		},
		data: function() {
			if(!this.ready()) return null;

			var place = K.placeById( this.params.placeId );
			
			if(!place) {
				history.back();
				return null;
			}

			place.update();	//update instance adding new fields by placeById

			return place.rData();
		}
	});

	this.route('placeMap', {
		path: '/place/:placeId/map',
		template: 'empty',
		layoutTemplate: 'layoutMap',
		waitOn: function() {
			Session.set('showSidebar', false);
			return Meteor.subscribe('placeById', this.params.placeId);
		},
		onAfterAction: function() {
			if(!this.ready()) return null;

			var place = K.placeById( this.params.placeId );

			if(place){
				place.update().showLoc(function() {
					Router.go('map');	
				});
			}
		}
	});

	this.route('placeGeom', {
		path: '/place/:placeId/geom',
		template: 'empty',
		layoutTemplate: 'layoutMap',
		waitOn: function() {
			Session.set('showSidebar', false);
			return Meteor.subscribe('placeById', this.params.placeId);
		},
		onAfterAction: function() {
			if(!this.ready()) return null;

			var place = K.placeById( this.params.placeId );

			if(place) {
				place.update().showGeometry(function() {
					Router.go('map');	
				});
			}
		}
	});

	this.route('placeCheckins', {
		path: '/place/:placeId/checkins',
		template: 'panelList',
		layoutTemplate: 'layoutMap',
		waitOn: function() {
			Session.set('showSidebar', true);
			return Meteor.subscribe('usersByCheckin', this.params.placeId);
		},
		data: function() {
			if(!this.ready()) return null;

			var place = K.placeById(this.params.placeId);
			return place && {
				title: i18n('title_checkins', place.name),
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
			Session.set('showSidebar', true);
			if(this.params.userId===Meteor.userId())
				Router.go('profile');
			else
				return Meteor.subscribe('userById', this.params.userId);
		},
		data: function() {
			if(!this.ready()) return null;

			if(!K.findUserById(this.params.userId).count()) {
				history.back();
				return null
			}

			var user = K.userById(this.params.userId);
			
			if(!user){
				history.back();
				return null;
			}

			user.update();	//update instance adding new fields by userById
			
			return user.rData();
		}
	});

	this.route('userMap', {
		path: '/user/:userId/map',
		template: 'empty',
		layoutTemplate: 'layoutMap',
		waitOn: function() {
			Session.set('showSidebar', false);
			return Meteor.subscribe('friendsByIds', [this.params.userId]);
		},
		onAfterAction: function() {
			var user = K.userById( this.params.userId );

			if(user)
				user.showLoc();
		}
	});	

});
