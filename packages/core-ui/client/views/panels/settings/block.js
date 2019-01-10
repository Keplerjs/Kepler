
Template.item_user_block.events({
	'click .user-btn-unblock': function(e, tmpl) {
		K.Profile.userUnblock(this.id);
	}
});
