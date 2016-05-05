
//http://stackoverflow.com/questions/27542120/whats-the-difference-between-writing-routes-in-meteor-startup-and-not

Router.configure({
	layoutTemplate: 'layoutMap',
	loadingTemplate: 'panelLoading',
	notFoundTemplate: 'page404'
});
//Router.setTemplateNameConverter(function (str) { return str; });

Router.subscriptions(function() {
	//console.log('main subscriptions');
	return Meteor.subscribe('currentUser');
});

Router.onBeforeAction(function() {
	var self = this;

	if(!Meteor.user())
	{
	    if(Meteor.loggingIn())
	    	this.render(this.loadingTemplate);
	    else {
	    	console.log('Router.go INTRO')
	    	Router.go('intro');
	    }
	}
	else {
		K.profile.initProfile(function() {
			self.next();
		});
	}
	  
}, {except: ['intro'] });

Router.onAfterAction(function() {
	document.title = Meteor.settings.public.website.title;// +' - '+ this.route.getName();
	//if(this.ready())
	//	K.map.initMap(Meteor.settings.public.map, function() {
	//		this.enableBBox();
	//	});//*/
});

Router.map(function() {

	this.route('intro', {
		path: '/intro',
		template: 'pageIntro',
		layoutTemplate: 'layoutFull',
		loadingTemplate: 'pageLoading',
	});

	this.route('about', {
		path: '/about',
		template: 'pageAbout',
		layoutTemplate: 'layoutPage',
		loadingTemplate: 'pageLoading',
	});	

	this.route('settings', {
		path: '/settings',
		template: 'pageSettings',
		layoutTemplate: 'layoutPage',
		loadingTemplate: 'pageLoading'
	});

	this.route('settingsBlocked', {
		path: '/settings/blocked',
		template: 'pageSettingsBlocked',
		layoutTemplate: 'layoutPage',
		loadingTemplate: 'pageLoading',
		waitOn: function() {
			return Meteor.subscribe('usersByIds', K.profile.data.friends );
		}
	});	

	this.route('logout', {
		path: '/logout',
		onBeforeAction: function () {
			K.profile.logout();
			Router.go('intro');
		}
	});

	//MAP PAGES

	this.route('map', {
		path: '/',
		template: 'pageMap',
		data: { hideSidebar: true }
	});

	this.route('profile', {
		path: '/profile',
		template: 'panelProfile',
		data: function() {
			return Meteor.user();
		}
	});

	this.route('friends', {
		path: '/friends',
		template: 'panelFriends',
		waitOn: function() {
			return Meteor.subscribe('friendsByIds', K.profile.data.friends );
		},
		data: function() {
			return {
				friends: K.profile.getFriends()
			};
		}	
	});

	this.route('favorites', {
		path: '/favorites',
		template: 'panelList',
		waitOn: function() {
			return Meteor.subscribe('placesByIds', K.profile.data.favorites);
		},
		data: function() {
			var places = _.map(K.profile.data.favorites, K.newPlace);
			return {
				title: i18n('ui.titles.favorites'),
				className: 'favorites',
				itemsTemplate: 'item_place_favorite',
				items: _.sortBy(places, 'name')
			};
		}
	});
	this.route('history', {
		path: '/history',
		template: 'panelList',
		waitOn: function() {
			return Meteor.subscribe('placesByIds', K.profile.data.hist);
		},
		data: function() {
			var places = _.map(K.profile.data.hist, K.newPlace);
			return {
				title: i18n('ui.titles.histplaces'),
				className: 'history',
				itemsTemplate: 'item_place_favorite',
				items: places.reverse()
			};
		}
	});	

	this.route('notifications', {
		path: '/notifications',
		template: 'panelList',
		data: function() {
			return {
				title: i18n('ui.titles.notifications'),
				className: 'notifications',
				items: []
				/*itemsTemplate: 'item_notif',
				items: K.profile.data.notifs*/
			};
		}
	});

	this.route('nearby', {
		path: '/nearby',		
		template: 'panelNearby',
		data: function() {
			
			if(!K.map.ready) return null;

			var bbox = K.map.getBBox(),
				places = _.map(getPlacesByBBox(bbox).fetch(), function(place) {
					var p = K.newPlace(place._id._str);
					if($(p.marker._icon).is(':visible'))
						return p.rData();
				});

			if(bbox) {
				return {
					places: _.sortBy(_.compact(places), 'name')
				};
			}
		}
	});

	this.route('place', {
		path: '/place/:placeId',		
		template: 'panelPlace',
		waitOn: function() {
			return Meteor.subscribe('placeById', this.params.placeId);
		},
		data: function() {
			return K.newPlace(this.params.placeId).rData();
		}
	});

	this.route('placeMap', {
		path: '/place/:placeId/map',
		template: 'emptyTmpl',
		waitOn: function() {
			return Meteor.subscribe('placesByIds', [this.params.placeId]);
		},
		onBeforeAction: function() {
			K.newPlace( this.params.placeId ).loadLoc();
			this.next();
		},
		data: { hideSidebar: true }
	});

	this.route('placeCheckins', {
		path: '/place/:placeId/checkins',
		template: 'panelList',
		waitOn: function() {
			var place = K.newPlace(this.params.placeId);
			return Meteor.subscribe('usersByIds', place.checkins);
		},
		data: function() {
			var place = K.newPlace(this.params.placeId);
			return {
				title: i18n('ui.titles.checkins')+'<a href="/place/'+this.params.placeId+'"><b>'+place.name+'</b></a>',
				className: 'checkins',
				itemsTemplate: 'item_user',
				items: _.map(place.checkins, K.newUser),
				sortDesc: true
			};
		}
	});

	this.route('placeConvers', {
		path: '/place/:placeId/convers',
		template: 'panelList',
		waitOn: function() {
			return Meteor.subscribe('conversByPlace', this.params.placeId);
		},
		data: function() {
			var place = K.newPlace(this.params.placeId),
				convers = getConversByPlace(this.params.placeId).fetch();

			return {
				title: i18n('ui.titles.placeConvers')+'<a href="/place/'+this.params.placeId+'"><b>'+place.name+'</b></a>',
				className: 'placeConvers',
				itemsTemplate: 'itemConver',
				items: convers,
				sortDesc: true,
				header: {
					template: 'itemConverNew',
					data: place
				}
			};
		}
	});

	this.route('placePois', {
		path: '/place/:placeId/pois',
		template: 'emptyTmpl',
		subscriptions: function() {
			console.log('route subscriptions poisByPlace')
			return Meteor.subscribe('poisByPlace', this.params.placeId);
		},
		onAfterAction: function() {
			K.newPlace( this.params.placeId ).loadPois();
		},
		data: { hideSidebar: true }
	});

	this.route('placeTracks', {
		path: '/place/:placeId/tracks',
		template: 'emptyTmpl',
		subscriptions: function() {
			return Meteor.subscribe('tracksByPlace', this.params.placeId);
		},
		onAfterAction: function() {
			K.newPlace( this.params.placeId ).loadTracks();
		},
		data: { hideSidebar: true }
	});

	/*TODO
	this.route('placeSectors', {
		path: '/place/:placeId/sectors',
		template: 'panelList',
	});*/
	
	this.route('user', {
		path: '/user/:userId',
		template: 'panelUser',
		subscriptions: function() {
			return Meteor.subscribe('userById', this.params.userId);
		},		
		onBeforeAction: function() {
			if(this.params.userId===Meteor.userId())
				Router.go('profile');
			else
				this.next();
		},
		data: function() {
			return K.newUser(this.params.userId);
		}
	});

	this.route('userConver', {
		path: '/user/:userId/conver',
		//template: 'panelConver',
		onBeforeAction: function() {
			if(this.params.userId===Meteor.userId())
				Router.go('convers');
			else
				K.conver.loadConverWithUser( this.params.userId );
		}
	});

	/*TODO
	this.route('userConver', {
		path: '/user/:userId/bid',
		//template: 'panelConver',
		onBeforeAction: function() {
			if(this.params.userId===Meteor.userId())
				Router.go('convers');
			
			//TODO send invitation to going in place
		}
	});*/

	this.route('convers', {
		path: '/convers',
		template: 'panelList',
		waitOn: function() {
			return Meteor.subscribe('conversByIds', K.profile.data.convers);
		},
		data: function() {
			return {
				title: i18n('ui.titles.convers'),
				className: 'convers',
				itemsTemplate: 'itemConver',
				items: getConversByIds(K.profile.data.convers).fetch(),
				sortDesc: true
			};
		}
	});
	
	this.route('conver', {
		path: '/conver/:convId',
		template: 'panelConver',
		waitOn: function() {
			return Meteor.subscribe('converById', this.params.convId);
		},
		data: function() {
			return getConverById(this.params.convId).fetch()[0];
		}
	});
});
