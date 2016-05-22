
Template.search_user.onRendered(function() {
	
	$(this.firstNode).parent().siblings('.list-group').btsListFilter('.friends-search', {
		itemChild: '.user-btn-name',
		sourceData: function(val, callback) {
			var list$ = $(this);
			
			list$.addClass('loading-lg');
			Meteor.subscribe('usersByName', val, function() {
				list$.removeClass('loading-lg');
				var ids = _.pluck(getUsersByName(val).fetch(), '_id');
				callback( _.map(ids, K.newUser) );
			});
		},
		sourceNode: function(data) {
			var item$ = $('<li class="list-group-item"></li>');
			Blaze.renderWithData(Template.item_user, data, item$[0]);
			return item$;
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
