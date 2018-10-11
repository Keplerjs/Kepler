
Template.popupCursor_share.onRendered(function() {

	var self = this;

	new Clipboard(self.find('.btn-share'))
	.on('success', function() {
		self.$('.btn-share').tooltip({title: i18n('btn_copied') }).tooltip('show');
	})
});

Template.popupCursor_share.events({
	'click .btn-share': function(e,tmpl) {
		e.preventDefault();
	}
});
