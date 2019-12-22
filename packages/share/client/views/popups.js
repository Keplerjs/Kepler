
Template.popupCursor_share.onRendered(function() {

	var self = this;

	new Clipboard(self.find('.btn-share'))
	.on('success', function() {
		self.$('.btn-share').tooltip({title: i18n('btn_copied') }).tooltip('show');
	})
});

Template.popupCursor_share.helpers({
	url: function() {
		var data = Template.currentData(),
			ll = data.loc.join(','),
			z = K.Map.map.getZoom();
		return Meteor.absoluteUrl('map/'+ll+','+z);
	}
});

Template.popupCursor_share.events({
	'click .btn-share': function(e,tmpl) {
		e.preventDefault();
	}
});
