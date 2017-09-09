
Template.user_btns_panel.onRendered(function() {
	var self = this;
	self.$('.user-btn-del').btsConfirmButton(function(e) {
		K.Profile.friendDel(self.data.id);
	});
	self.$('.user-btn-block').btsConfirmButton(function(e) {
		K.Profile.userBlock(self.data.id);
	});	
});

Template.user_btns_panel.events({
	'click .user-btn-add': function(e, tmpl) {
		K.Profile.friendAdd(this.id);
	},
	'click .user-btn-confirm': function(e, tmpl) {
		K.Profile.friendConfirm(this.id);
	}
});
