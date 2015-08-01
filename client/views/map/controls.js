
Template.control_status.onRendered(function(){
	
	//console.log('control_status rendered',Meteor.status().connected);

	var div$ = $('.leaflet-control-status'),
		stat = Meteor.status();

	if(stat.connected)
		setTimeout(function() {
			div$.fadeOut('slow');
		}, 3000);
});

Template.control_status.helpers({
	status: function() {

		var div$ = $('.leaflet-control-status'),
			stat = Meteor.status();

		if(stat.connected)
			setTimeout(function() {
				div$.fadeOut('slow');
			}, 3000);
		else
			div$.fadeIn('fast');

		return stat.status;
	}
});

Template.control_status.events({
	'click a': function(e) {
		Meteor.reconnect();
	}
});

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
