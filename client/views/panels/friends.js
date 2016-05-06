
Template.panelFriends.onRendered(function() {
	
	this.$('.list-group').btsListFilter('.users-inp-search', {
		itemChild: '.user-btn-name',
		sourceData: function(val, callback) {
			var list$ = $(this);
			
			list$.addClass('loading-lg');

			Meteor.subscribe('usersByName', val, function() {
				list$.removeClass('loading-lg');
				var usersIds = _.pluck(getUsersByName(val).fetch(), '_id'),
					users = _.map(usersIds, K.newUser);
				callback( users );
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
		size: 'mini',		
		onColor: 'success',		
		state: K.profile.getOnline(),
		onSwitchChange: function (e, stat) {
			K.profile.setOnline(stat);
		}
	});
});
