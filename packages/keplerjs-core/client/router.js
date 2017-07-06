
Router.configure({
	layoutTemplate: 'layoutMap',
	loadingTemplate: 'panelLoading',
	notFoundTemplate: 'page404'
});

Router.waitOn(function() {
	//console.log('Router.waitOn');

	if(!Meteor.user()) {
		if(Meteor.loggingIn())
			this.render(this.loadingTemplate);
		else
			Router.go('pageIntro');
	}
	else {
		return Meteor.subscribe('currentUser', function() {
			K.Profile.init(function() {
				K.Admin.loadMethods();
			});
		});
	}
});

Router.onBeforeAction(function(pause) {

	var self = this;

	if(this.ready())
	{

		if(!_.isEmpty(K.Profile.data)) {

			//TODO hook for plugins actions
			
			K.Map.init(K.Profile.getOpts('map'), function() {
				this.enableBBox();
			});
		}
	}
	else
		this.render('pageLoading');
	
	self.next();

}, {except: ['pageIntro','settings','pageSettingsBlock','pageAbout','logout'] });//*/

Router.onAfterAction(function() {
	document.title = i18n('titles.'+this.route.getName()) || _.str.capitalize(this.route.getName());	
});

Router.map(function() {

	this.route('pageIntro', {
		path: '/intro',
		layoutTemplate: 'layoutFull',
		loadingTemplate: 'pageLoading',
	});

	this.route('pageAbout', {
		path: '/about',
		layoutTemplate: 'layoutPage',
		loadingTemplate: 'pageLoading',
	});	

	this.route('pageSettings', {
		path: '/settings',
		layoutTemplate: 'layoutPage',
		loadingTemplate: 'pageLoading',
		data: function() {
			return Meteor.user();
		}
	});

	this.route('pageSettingsBlock', {
		path: '/settings/blocked',
		layoutTemplate: 'layoutPage',
		loadingTemplate: 'pageLoading',
		waitOn: function() {
			return Meteor.subscribe('usersByIds', K.Profile.data.friends );
		}
	});	

	this.route('logout', {
		path: '/logout',
		onBeforeAction: function () {
			K.Profile.logout();
			K.Map.destroy();
			Router.go('pageIntro');
		}
	});

	//MAP PAGES

	this.route('map', {
		path: '/',
		template: 'empty',
		data: { hideSidebar: true }
	});

	this.route('panelProfile', {
		path: '/profile',
		data: function() {
			return Meteor.user();
		}
	});

	this.route('friends', {
		path: '/friends',
		template: 'panelList',
		waitOn: function() {
			return Meteor.subscribe('friendsByIds', K.Profile.data.friends);
		},
		data: function() {
			if(!this.ready()) return null;
			return {
				title: i18n('titles.friends'),
				className: 'friends',			
				headerTemplate: 'search_user',
				itemsTemplate: 'item_user_friend',
				items: _.map(K.Profile.data.friends, function(id) {
					
					var user = K.userById(id);
					user.update();

					return user;
				})
			};
		}	
	});

	this.route('places', {
		path: '/places',
		template: 'panelList',
		data: function() {
			if(!this.ready()) return null;
			var bbox = K.Map.getBBox(),
				places = K.findPlacesByBBox(bbox).fetch();
			return {
				title: i18n('titles.places'),
				className: 'places',
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

	this.route('convers', {
		path: '/convers',
		template: 'panelList',
		waitOn: function() {
			return Meteor.subscribe('conversByIds', K.Profile.data.convers);
		},
		data: function() {
			return {
				title: i18n('titles.convers'),
				className: 'convers',
				itemsTemplate: 'item_conver',
				items: K.findConversByIds(K.Profile.data.convers).fetch(),
				sortDesc: true
			};
		}
	});
	

	this.route('favorites', {
		path: '/favorites',
		template: 'panelList',
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
		waitOn: function() {
			return Meteor.subscribe('placesByIds', [this.params.placeId]);
		},
		onAfterAction: function() {
			if(!this.ready()) return null;

			var place = K.placeById( this.params.placeId );

			if(place)
				place.loadLoc();
		},
		data: { hideSidebar: true }
	});

	this.route('placeCheckins', {
		path: '/place/:placeId/checkins',
		template: 'panelList',
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

	this.route('placeConvers', {
		path: '/place/:placeId/convers',
		template: 'panelList',
		waitOn: function() {
			return Meteor.subscribe('conversByTarget', this.params.placeId);
		},
		data: function() {
			if(!this.ready()) return null;
			var place = K.placeById(this.params.placeId);
			return place && {
				title: i18n('titles.placeConvers', place.name),
				className: 'placeConvers',
				headerTemplate: 'conver_place_new',
				headerData: place,		
				itemsTemplate: 'item_conver',
				items: K.findConversByTarget(this.params.placeId).fetch()
			};
		}
	});

	this.route('panelUser', {
		path: '/user/:userId',
		waitOn: function() {
			if(this.params.userId===Meteor.userId())
				Router.go('panelProfile');
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

	this.route('userConver', {
		path: '/user/:userId/conver',
		template: 'empty',
		waitOn: function() {
			if(this.params.userId===Meteor.userId())
				Router.go('convers');
			else
				K.Conver.loadConverWithUser( this.params.userId );
		}
	});

	this.route('userMap', {
		path: '/user/:userId/map',
		template: 'empty',
		waitOn: function() {
			return Meteor.subscribe('friendsByIds', [this.params.userId]);
		},
		onAfterAction: function() {
			var user = K.userById( this.params.userId );

			if(user)
				user.loadLoc();
		},		
		data: { hideSidebar: true }
	});	

	this.route('panelConver', {
		path: '/conver/:convId',
		waitOn: function() {
			return Meteor.subscribe('converById', this.params.convId);
		},
		data: function() {
			return K.findConverById(this.params.convId).fetch()[0];
		}
	});
});
