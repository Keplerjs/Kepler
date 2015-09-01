
Template.user_btns2.onRendered(function() {
	
	this.$('.user-btn-del').btsConfirmButton({
			msg: i18n('ui.btns.frienddel')
		}, function(e) {
			Climbo.profile.friendDel($(e.target).data('userid'));
		});
});

Template.user_btns2.events({
	'click .user-btn-add': function(e, tmpl) {
		Climbo.profile.friendAdd(this.id);
	},
	'click .user-btn-del': function(e, tmpl) {
		Climbo.profile.friendDel(this.id);
	},
	'click .user-btn-block': function(e, tmpl) {
		Climbo.profile.userBlock(this.id);
	}	
});
