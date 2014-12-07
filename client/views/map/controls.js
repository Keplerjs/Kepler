
Template.control_status.rendered = function(){
	
	//console.log('control_status rendered',Meteor.status().connected);

	var div$ = $('.leaflet-control-status'),
		stat = Meteor.status();

	if(stat.connected)
		setTimeout(function() {
			div$.fadeOut('slow');
		}, 3000);
};

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

//TODO spostare gestione eventi dentro Climbo.map.js con leaflet
Template.control_profile.events({
	'click a': function(e) {
		Climbo.map.loadPanelProfile();
	}
});

Template.control_friends.events({
	'click a': function(e) {
		Climbo.map.loadPanelFriends();
	}
});

/* ALERTS */

Template.control_alerts.events({
	'click .alerts-btn-close': function(e,tmpl) {
		Climbo.alerts.hide();
	}
});

Template.item_alert.rendered = function() {
	$(this.firstNode).alert().slideDown(function(){
		$(this).fadeTo('slow',1);
	});
};
