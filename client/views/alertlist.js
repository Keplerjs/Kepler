
Template.alertList.events({
	'click .alerts-btn-close': function(e,tmpl) {
		K.alert.hide();
	}
});

Template.item_alert.onRendered(function() {
	$(this.firstNode).alert().slideDown(function() {
		$(this).fadeTo('slow',1);
	});
});
