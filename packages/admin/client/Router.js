
Router.waitOn(function() {

	if(Meteor.user() && _.isEmpty(K.Admin.method)) {
		K.Admin.loadMethods();
	}

});

Router.map(function() {

	this.route('panelAdmin', {
		path: '/admin',
		template: 'panelAdmin',
		layoutTemplate: 'layoutMap',
		loadingTemplate: 'pageLoading',
		onBeforeAction: function () {
			if(!K.Admin.isMe())
				history.back();
			else
				this.next();
		},
		waitOn: function() {
			Session.set('showSidebar', true);
		}
	});

	this.route('panelAdminMethods', {
		path: '/admin/methods',
		template: 'panelList',
		layoutTemplate: 'layoutMap',
		loadingTemplate: 'pageLoading',
		onBeforeAction: function() {
			if(!K.Admin.isMe())
				history.back()
			else
				this.next();
		},
		waitOn: function() {
			Session.set('showSidebar', true);
		},
		data: function() {
			if(!this.ready()) return null;
			return {
				title: i18n('title_panelAdminMethods'),
				className: 'adminMethods',
				headerTemplate: 'panelAdminMethods_search',
				itemsTemplate: 'itemAdminMethod',
				items: _.map(_.keys(K.Admin.method), function(k) {
					return {name: k}
				})
			};
		}
	});

	this.route('pageAdminUsers', {
		path: '/admin/users',
		template: 'pageAdminUsers',
		layoutTemplate: 'layoutPage',
		loadingTemplate: 'pageLoading',
		onBeforeAction: function () {
			if(!K.Admin.isMe())
				history.back();
			else
				this.next();
		},
		waitOn: function() {
			return Meteor.subscribe('usersByDate');
		},
		data: function() {
			if(!this.ready()) return null;
			var users = K.findUsersByDate().fetch(),
				userIds = _.pluck(users,'_id');
			userIds = _.without(userIds, K.Profile.id);
			return {

				items: _.map(userIds, K.userById)
			};
		}
	});

	this.route('pageAdminUser', {
		path: '/admin/users/:id',
		template: 'pageAdminUsers',
		layoutTemplate: 'layoutPage',
		loadingTemplate: 'pageLoading',
		onBeforeAction: function () {
			if(!K.Admin.isMe())
				history.back();
			else
				this.next();
		},
		waitOn: function() {
			return [
				Meteor.subscribe('usersByDate'),
				Meteor.subscribe('adminUserById', this.params.id)
			];
		},
		data: function() {
			if(!this.ready()) return null;
			
			var user = K.userById(this.params.id),
				users = K.findUsersByDate().fetch(),
				userIds = _.pluck(users,'_id');
			
			userIds = _.without(userIds, K.Profile.id);

			if(!user)
				Router.go('pageAdminUsers');
			else
				return {
					itemSelected: user.update(),
					rawdata: Users.findOne(this.params.id),
					items: _.map(userIds, K.userById)
				};
		}
	});	

	this.route('pageAdminPlaces', {
		path: '/admin/places',
		template: 'pageAdminPlaces',
		layoutTemplate: 'layoutPage',
		loadingTemplate: 'pageLoading',
		onBeforeAction: function () {
			if(!K.Admin.isMe())
				history.back();
			else
				this.next();
		},
		waitOn: function() {
			return Meteor.subscribe('placesByDate');
		},
		data: function() {
			if(!this.ready()) return null;
			return {
				items: _.map(K.findPlacesByDate().fetch(), function(item) {
					return K.placeById(item._id);
				})
			};
		}
	});

	this.route('pageAdminPlace', {
		path: '/admin/places/:id',
		template: 'pageAdminPlaces',
		layoutTemplate: 'layoutPage',
		loadingTemplate: 'pageLoading',
		onBeforeAction: function () {
			if(!K.Admin.isMe())
				history.back();
			else
				this.next();
		},
		waitOn: function() {
			return [
				Meteor.subscribe('placesByDate'),
				Meteor.subscribe('adminPlaceById', this.params.id)
			];
		},
		data: function() {
			if(!this.ready()) return null;
			var places = K.findPlacesByDate().fetch(),
				place = K.placeById(this.params.id).update();
			
			if(_.where(places,{_id: place.id}).length===0)
				places = _.union(place, places);

			return {
				itemSelected: place,
				rawdata: Places.findOne(this.params.id),
				items: _.map(places, function(item) {
					return K.placeById(item._id);
				})
			};
		}
	});	
});
