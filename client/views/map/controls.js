
/* ALERTS */

Template.control_alerts.events({
	'click .alerts-btn-close': function(e,tmpl) {
		Climbo.alerts.hide();
	}
});

Template.item_alert.onRendered(function() {
	$(this.firstNode).alert().slideDown(function(){
		$(this).fadeTo('slow',1);
	});
});
