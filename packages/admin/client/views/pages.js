
Template.pageAdminUsers.onRendered(function() {
	var self = this;

	$(self.firstNode).find('.list-items').btsListFilter('.users-search', {
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

});


Template.pageAdminUsers.events({
	'click .user-btn-new': function(e,tmpl) {
		e.preventDefault();
		
		var input$ = tmpl.$('.user-name-new'),
			username = _.str.clean(input$.val());
		
		if(!_.str.isBlank(username))
			K.Admin.insertUser(username);

		input$.val('');
	},
	'keydown .user-name-new': function(e,tmpl) {
		if(e.keyCode===13)//enter
		{
			e.preventDefault();
			tmpl.$('.user-btn-new').trigger('click');
		}
	}

});

Template.item_user_admin.onRendered(function() {
	
	var username = this.data.username;
	this.$('.user-btn-del').btsConfirmButton(function(e) {
		K.Admin.removeUser(username);
	});
});