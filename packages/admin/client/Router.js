
Router.map(function() {

	this.route('panelAdmin', {
		path: '/admin',
		template: 'panelAdmin',
		layoutTemplate: 'layoutMap',
		loadingTemplate: 'pageLoading',
		onBeforeAction: function () {
			if(!K.Admin.isMe())
				Router.go('root');
			else
				this.next();
		},
		waitOn: function() {
			Session.set('showSidebar', true);
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
});
