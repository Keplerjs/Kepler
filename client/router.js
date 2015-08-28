
Router.configure({
	layoutTemplate: 'layoutFull',
	loadingTemplate: 'pageLoading',
	notFoundTemplate: 'page404'
});
//Router.setTemplateNameConverter(function (str) { return str; });

Router.onBeforeAction(function(){

	if(!(Meteor.loggingIn() || Meteor.user()))
		Router.go('intro');

	this.next();

}, {except: ['intro'] });

Router.waitOn(function() {

	return Meteor.subscribe('currentUser', function() {

		Climbo.profile.initProfile();
	});
});

Router.map(function() {

	this.route('map', {
		path: '/',
		template: 'panelMap',
		layoutTemplate: 'layoutMap'
	});

	this.route('intro', {
		path: '/intro',
		template: 'pageIntro',
		layoutTemplate: 'layoutFull'
	});

	this.route('profile', {
		path: '/profile',
		template: 'panelProfile',
		layoutTemplate: 'layoutMap'
	});

	this.route('friends', {
		path: '/friends',
		template: 'panelFriends',		
		layoutTemplate: 'layoutMap',
		waitOn: function() {
			return Meteor.subscribe('friendsByIds', Climbo.profile.data.friends);
		},
		data: function() {
			return {
				friends: _.map(Climbo.profile.data.friends, function(userId) {
					return Climbo.newUser(userId).rData();
				})
			};
		}	
	});

	this.route('favorites', {
		path: '/favorites',
		template: 'panelList',
		layoutTemplate: 'layoutMap',
		waitOn: function() {
			return Meteor.subscribe('placesByIds', Climbo.profile.data.favorites);
		},
		data: function() {
			return {
				className: 'favorites',
				itemsTemplate: 'item_place_favorite',
				items: _.map(Climbo.profile.data.favorites, Climbo.newPlace),
				sortDesc: true,
				sortBy: 'name'
			};
		}
	});

	this.route('notifications', {
		path: '/notifications',
		template: 'panelList',
		layoutTemplate: 'layoutMap',
/*		waitOn: function() {
			return Meteor.subscribe('placesByIds', Climbo.profile.data.favorites);
		},*/
		data: function() {
			return {
				title: i18n('ui.titles.notifications'),
				className: 'notifications',
				items: []
				/*itemsTemplate: 'item_notif',
				items: Climbo.profile.data.notifs*/
			};
		}
	});

	this.route('places', {
		path: '/places',		
		template: 'panelPlaces',
		layoutTemplate: 'layoutMap',
		waitOn: function() {
			var bb = Climbo.map.getBBox();
			if(bb)
				return Meteor.subscribe('placesByBBox', bb);
		},
		data: function() {
			
			if(!Climbo.map.leafletMap) return false;

			var bbox = Climbo.map.getBBox(),
				places = _.map(getPlacesByBBox(bbox).fetch(), function(place) {
					var p = Climbo.newPlace(place._id);
					if($(p.marker._icon).is(':visible'))
						return p.rData();
				});

			if(bbox)
				return {
					places: _.sortBy(_.compact(places), 'name')
				};
		}
	});

	this.route('place', {
		path: '/place/:placeId',		
		template: 'panelPlace',
		layoutTemplate: 'layoutMap',
		waitOn: function() {
			return Meteor.subscribe('placeById', this.params.placeId);
		},
		data: function() {
			return Climbo.newPlace(this.params.placeId).rData();
		}
	});

	this.route('placeMap', {
		path: '/place/:placeId/map',
		template: 'emptyTmpl',
		layoutTemplate: 'layoutMap',
		waitOn: function() {
			return Meteor.subscribe('placesByIds', [this.params.placeId]);
		},
		onBeforeAction: function() {
			Climbo.newPlace( this.params.placeId ).loadLoc();
			this.next();
		}
	});

	this.route('placePois', {
		path: '/place/:placeId/pois',
		template: 'emptyTmpl',
		layoutTemplate: 'layoutMap',
		waitOn: function() {
			return Meteor.subscribe('placesByIds', [this.params.placeId]);
		},
		onBeforeAction: function() {
			Climbo.newPlace( this.params.placeId ).loadPois();
			this.next();
		}
	});

	this.route('placeTracks', {
		path: '/place/:placeId/tracks',
		template: 'emptyTmpl',
		layoutTemplate: 'layoutMap',
		waitOn: function() {
			return Meteor.subscribe('placesByIds', [this.params.placeId]);
		},
		onBeforeAction: function() {
			Climbo.newPlace( this.params.placeId ).loadTracks();
			this.next();
		}
	});

	this.route('placeCheckins', {
		path: '/place/:placeId/checkins',
		template: 'panelList',
		layoutTemplate: 'layoutMap',
		waitOn: function() {
			var place = Climbo.newPlace(this.params.placeId);
			return Meteor.subscribe('usersByIds', place.checkins);
		},
		data: function() {
			var place = Climbo.newPlace(this.params.placeId);
			return {
				title: i18n('ui.titles.checkins')+place.name,
				className: 'checkins',
				itemsTemplate: 'item_user',
				items: _.map(place.checkins, Climbo.newUser),
				sortDesc: true
			};
		}
	});

	this.route('placeConvers', {
		path: '/place/:placeId/convers',
		template: 'panelList',
		layoutTemplate: 'layoutMap',
		waitOn: function() {
			return Meteor.subscribe('conversByPlace', this.params.placeId);
		},
		data: function() {
			var place = Climbo.newPlace(this.params.placeId);
			return {
				title: i18n('ui.titles.placeConvers')+'<a href="/place/'+this.params.placeId+'"><b>'+place.name+'</b></a>',
				className: 'placeConvers',
				itemsTemplate: 'itemConver',
				items: getConversByPlace(this.params.placeId).fetch(),
				sortDesc: true,
				header: {
					template: 'itemConverNew',
					data: place
				}
			};
		}
	});

	this.route('user', {
		path: '/user/:userId',
		template: 'panelUser',
		layoutTemplate: 'layoutMap',
		onBeforeAction: function() {
			if(this.params.userId===Meteor.userId())
				Router.go('profile');
			else
				this.next();
		},
		waitOn: function() {
			return Meteor.subscribe('userById', this.params.userId);
		},
		data: function() {
			return Climbo.newUser(this.params.userId);
		}
	});

	this.route('userConver', {
		path: '/user/:userId/conver',
		//template: 'panelConver',
		layoutTemplate: 'layoutMap',
		onBeforeAction: function() {
			if(this.params.userId===Meteor.userId())
				Router.go('convers');
			else
				Climbo.conver.loadConverWithUser( this.params.userId );
		}
	});


	this.route('convers', {
		path: '/convers',
		template: 'panelList',
		layoutTemplate: 'layoutMap',
		waitOn: function() {
			return Meteor.subscribe('conversByIds', Climbo.profile.data.convers);
		},
		data: function() {
			return {
				title: i18n('ui.titles.convers'),
				className: 'convers',
				itemsTemplate: 'itemConver',
				items: getConversByIds(Climbo.profile.data.convers).fetch(),
				sortDesc: true
			};
		}
	});
	
	this.route('conver', {
		path: '/conver/:convId',
		template: 'panelConver',
		layoutTemplate: 'layoutMap',
		waitOn: function() {
			return Meteor.subscribe('converById', this.params.convId);
		},
		data: function() {
			return getConverById(this.params.convId).fetch()[0];
		}
	});

	this.route('settings', {
		path: '/settings',
		template: 'pageSettings',
		layoutTemplate: 'layoutPage'
	});

	this.route('logout', {
		path: '/logout',
		onBeforeAction: function () {
			Climbo.profile.logout();
			Router.go('intro');
		}
	});
});
