
Template.popupCursor_share.onRendered(function() {

	var self = this;

	new Clipboard(self.find('.btn-share'))
	.on('success', function() {
		self.$('.btn-share').tooltip({title: i18n('btn_copied') }).tooltip('show');
	})
});
