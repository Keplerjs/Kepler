
Template.item_user_blocked.events({
	'click .user-btn-unblock': function(e, tmpl) {
		K.Profile.userUnblock(this.id);
	}
});
