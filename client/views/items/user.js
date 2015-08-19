

Template.item_user.helpers({
	id: function() {
		return this.id || this._id;
	}
});

Template.user_buttons2.onRendered(function() {
	
	this.$('.user-btn-del').btsConfirmButton({
			msg: i18n('ui.btns.delfriend')
		}, function(e) {
			Climbo.profile.removeFriend($(e.target).data('userid'));
		});
});

Template.user_buttons2.events({
	'click .user-btn-add': function(e, tmpl) {
		Climbo.profile.addFriend(this.id);
	},
	'click .user-btn-del': function(e, tmpl) {
		Climbo.profile.removeFriend(this.id);
	},
	'click .user-btn-mes': function(e, tmpl) {
		//TODO convert in route
		Climbo.conver.loadConverWithUser(this.id);
	}
});
