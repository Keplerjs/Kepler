
Template.panel_friends.rendered = function() {
	
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
			UI.insert(UI.renderWithData(Template.item_user, user), userItem$[0]);
			return userItem$;
		}
	});
};

Template.users_list.helpers({	//lista sia amici che utenti cercati
	friends: function() {
		return Climbo.profile.getFriends();
	}
});

Template.switch_online.rendered = function() {
	
	this.$('#switch_online').bootstrapSwitch({
		state: Climbo.profile.getOnline(),
		onColor: 'success',
		onText: '&nbsp;Online&nbsp;',
		offText: '&nbsp;Offline&nbsp;',
		size: 'small',
		onSwitchChange: function (e, stat) {
			Climbo.profile.setOnline(stat);
		}
	});
};
