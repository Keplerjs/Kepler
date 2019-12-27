
Template.controlSwitch.onCreated(function() {
	Session.set('mapLabel','');
});

Template.controlSwitch.helpers({
	mapLabel: function() {
		return Session.get('mapLabel');
	}
});

Template.controlSwitch.events({
	'click a': function(e,tmpl) {
		K.Map.cleanGeojson();
		Session.set('mapLabel','');		
	}
});
