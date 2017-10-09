
Template.search_user.onRendered(function() {
	var self = this;

	$(self.firstNode).parent().siblings('.list-items').btsListFilter('.users-search', {
		itemChild: '.user-btn-name',
		loadingClass: 'loading-lg',
		sourceData: function(val, callback) {
			
			Meteor.subscribe('usersByName', val, function() {
				
				var users = _.map( K.findUsersByName(val).fetch(), function(user) {
					return K.userById(user._id);
				});

				callback(users);
			});
		},
		sourceNode: function(data) {
			var item$ = $('<li class="list-group-item"></li>');
			Blaze.renderWithData(Template.item_user, data, item$[0]);
			return item$;
		},
		cancelNode: function() {
			return self.$('.search-canc');
		}
	});

	self.$('#switch_online').bootstrapSwitch({
		size: 'mini',
		onColor: 'success',		
		state: K.Profile.getOnline(),
		onSwitchChange: function (e, stat) {
			K.Profile.setOnline(stat);
		}
	});
});