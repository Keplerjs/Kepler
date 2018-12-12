
Router.map(function() {

	this.route('panelAdmin', {
		path: '/admin',
		template: 'panelAdmin',
		layoutTemplate: 'layoutMap',
		loadingTemplate: 'pageLoading',
/* TODO fix and uncomment		onBeforeAction: function () {
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

	this.route('panelAdminUsers', {
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
			Session.set('showSidebar', true);
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

	this.route('panelAdminPlaces', {
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
			Session.set('showSidebar', true);
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
});
