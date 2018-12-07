

Template.pageAdminUsers.onCreated(function() {

	Session.set('userSelected', null);
});

Template.pageAdminUsers.onRendered(function() {
	var self = this;

	$(self.firstNode).find('.list-group').btsListFilter('.users-search', {
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
			var item$ = $('<div>');
			Blaze.renderWithData(Template.item_user_admin, data, item$[0]);
			return item$[0].firstChild;
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
	},

	'click .users-list .list-group-item': function(e,tmpl) {

		var input$ = $(e.currentTarget).find('input.btn-userselect');
		input$.prop('checked',true);
		input$.trigger('change');
	},

	'change input.btn-userselect': function(e,tmpl) {
		//e.preventDefault();

		var userId = $(e.currentTarget).val();
		
		Meteor.subscribe('userById', userId, function() {
	
			Session.set('userSelected', userId );
		});

	}

});

Template.pageAdminUsers.helpers({
	userSelected: function() {
		var id = Session.get('userSelected');
		return id && K.userById(id);
	}
});

Template.itemUserAdmin_admin.onRendered(function() {
	var self = this,
		username = this.data.username;

	self.$('.user-btn-del').btsConfirmButton(function(e) {
		e.stopPropagation();
		K.Admin.removeUser(username);
		Session.set('userSelected',null);
	});
});