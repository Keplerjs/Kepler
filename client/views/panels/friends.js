
Template.panelFriends.onRendered(function() {
	
	this.$('.list-group').btsListFilter('.users-inp-search', {
		itemChild: '.user-btn-name',
		sourceData: function(val, callback) {
			var list$ = $(this);
			
			list$.addClass('loading-lg');

			Meteor.subscribe('usersByName', val, function() {
				list$.removeClass('loading-lg');
				var usersIds = _.pluck(getUsersByName(val).fetch(), '_id');
				callback( _.map(usersIds, Climbo.newUser) );
			});
		},
		sourceNode: function(user) {
			var userItem$ = $('<li class="list-group-item"></li>');
			Blaze.renderWithData(Template.item_user, user, userItem$[0]);
			return userItem$;
		}
	});
});

Template.switch_online.onRendered(function() {
	
	this.$('#switch_online').bootstrapSwitch({
		state: Climbo.profile.getOnline(),
		onColor: 'success',
		onText: 'Online',
		offText: 'Offline',
		size: 'small',
		onSwitchChange: function (e, stat) {
			Climbo.profile.setOnline(stat);
		}
	});
});
