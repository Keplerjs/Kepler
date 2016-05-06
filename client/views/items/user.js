
Template.user_btns2.onRendered(function() {
	
	this.$('.user-btn-del').btsConfirmButton({
			msg: i18n('btns.frienddel')
		}, function(e) {
			K.profile.friendDel($(e.target).data('userid'));
		});
	this.$('.user-btn-block').btsConfirmButton({
			msg: i18n('btns.friendblock')
		}, function(e) {
			K.profile.friendBlock($(e.target).data('userid'));
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
		K.profile.friendAdd(this.id);
	},
	'click .user-btn-confirm': function(e, tmpl) {
		K.profile.friendConfirm(this.id);
	}
});
