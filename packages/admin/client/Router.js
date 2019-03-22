
Router.map(function() {

	this.route('panelAdmin', {
		path: '/admin',
		template: 'panelAdmin',
		layoutTemplate: 'layoutMap',
		loadingTemplate: 'pageLoading',
		/* TODO fix and uncomment		
		onBeforeAction: function () {
			if(!K.Admin.isMe())
				Router.go('root');
			else
				this.next();
		},*/
		waitOn: function() {
			Session.set('showSidebar', true);
			//return Meteor.subscribe('usersByDate');
		}
	});

	this.route('pageAdminUsers', {
		path: '/admin/users',
		template: 'pageAdminUsers',
		layoutTemplate: 'layoutPage',
		loadingTemplate: 'pageLoading',
		onBeforeAction: function () {
			if(!K.Admin.isMe())
				Router.go('root');
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
				Router.go('root');
			else
				this.next();
		},
		waitOn: function() {
			return [
				Meteor.subscribe('adminUserById', this.params.id),
				Meteor.subscribe('usersByDate')
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
					itemSelected: user,
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
				Router.go('root');
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
				Router.go('root');
			else
				this.next();
		},
		waitOn: function() {
			return [
				Meteor.subscribe('placeById', this.params.id),
				Meteor.subscribe('placesByDate')
			];
		},
		data: function() {
			if(!this.ready()) return null;
			return {
				itemSelected: K.placeById(this.params.id),
				items: _.map(K.findPlacesByDate().fetch(), function(item) {
					return K.placeById(item._id);
				})
			};
		}
	});	
});
