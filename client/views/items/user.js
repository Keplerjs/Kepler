
Template.item_user.events({
	'click .user-btn-name': function(e,tmpl) {
		this.loadPanel && this.loadPanel();
	}
});

Template.user_buttons.events({
	'click .place-btn-name': function(e,tmpl) {
		this.loadPanel();
	},
	'click .place-btn-checkins': function(e,tmpl) {
		this.loadCheckins();
	},	
	'click .place-btn-map': function(e, tmpl) {
		this.loadLoc();
	},
	'click .user-btn-map': function(e, tmpl) {
		tmpl.data.loadLoc();
	}	
});

Template.user_buttons2.rendered = function() {
	
	this.$('.user-btn-del').btsConfirmButton({
			msg: i18n('ui.btns.delfriend')
		}, function(e) {
			Climbo.profile.removeFriend($(e.target).data('userid'));
		});
};

Template.user_buttons2.events({
	'click .user-btn-add': function(e, tmpl) {
		Climbo.profile.addFriend(this.id);
	},
	'click .user-btn-del': function(e, tmpl) {
		Climbo.profile.removeFriend(this.id);
	},
	'click .user-btn-mes': function(e, tmpl) {
		Climbo.convers.loadConverWithUser(this.id);
	}
});
