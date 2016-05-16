
Template.item_friend_search.onRendered(function() {
	
	$(this.firstNode).parent().siblings('.list-group').btsListFilter('.friends-search', {
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
		},
		cancelNode: function() {
			return '<span class="btn form-control-feedback" aria-hidden="true"><i class="icon icon-canc"></i></span>';
		}
	});

	this.$('#switch_online').bootstrapSwitch({
		size: 'mini',		
		onColor: 'success',		
		state: K.profile.getOnline(),
		onSwitchChange: function (e, stat) {
			K.profile.setOnline(stat);
		}
	});
});
