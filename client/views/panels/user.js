
Template.panelUser.events({
	'click .nav-tabs a': function(e, tmpl) {
		e.preventDefault();
		$(e.currentTarget).tab('show');
	}
});

Template.user_btns2.onRendered(function() {
	
	this.$('.user-btn-del')
		.btsConfirmButton(i18n('btns.frienddel'), function(e) {
			K.Profile.friendDel($(e.target).data('userid'));
		});
	this.$('.user-btn-block')
		.btsConfirmButton(i18n('btns.friendblock'), function(e) {
			K.Profile.friendBlock($(e.target).data('userid'));
		});	
});

Template.user_btns2.events({
	'click .user-btn-add': function(e, tmpl) {
		K.Profile.friendAdd(this.id);
	},
	'click .user-btn-confirm': function(e, tmpl) {
		K.Profile.friendConfirm(this.id);
	}
});
