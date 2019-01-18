
Template.pageAdminUsers.onRendered(function() {
	var self = this;

	$(self.firstNode).find('.list-group').btsListFilter('.items-search', {
		itemChild: '.user-btn-name',
		loadingClass: 'loading-lg',
		sourceData: function(val, cb) {
			
			Meteor.subscribe('usersByName', val, function() {
				var items = _.map( K.findUsersByName(val).fetch(), function(item) {
					return K.userById(item._id);
				});
				cb(items);
			});
		},
		sourceNode: function(data) {
			var item$ = $('<div>');
			Blaze.renderWithData(Template.itemUserAdmin, data, item$[0]);
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
		if(e.keyCode===13) {//enter
			e.preventDefault();
			tmpl.$('.user-btn-new').trigger('click');
		}
	}
});

Template.itemUserAdmin_admin_btns.onRendered(function() {
	var self = this;
	self.$('.item-btn-del').btsConfirmButton(function(e) {
		e.stopPropagation();
		K.Admin.removeUser(self.data.username);
		Session.set('itemSelected',null);
	});
});

Template.pageAdminUser_admin_contact.helpers({
	rawdata: function() {
		if(this.type==='user')
			return Users.findOne(this._id);
		else if(this.type==='place')
			return Places.findOne(this._id);
	}
});