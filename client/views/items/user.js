
Template.user_btns2.onRendered(function() {
	
	this.$('.user-btn-del').btsConfirmButton({
			msg: i18n('ui.btns.frienddel')
		}, function(e) {
			Climbo.profile.friendDel($(e.target).data('userid'));
		});
});

Template.user_btns.events({
	'click .user-btn-map': function(e, tmpl) {
		//not use router url for users locations!!!
		this.loadLoc();
	},
});

Template.user_btns2.events({
	'click .user-btn-add': function(e, tmpl) {
		Climbo.profile.friendAdd(this.id);
	},
	'click .user-btn-confirm': function(e, tmpl) {
		Climbo.profile.friendConfirm(this.id);
	},	
	'click .user-btn-del': function(e, tmpl) {
		Climbo.profile.friendDel(this.id);
	},
	'click .user-btn-block': function(e, tmpl) {
		Climbo.profile.userBlock(this.id);
	}	
});
