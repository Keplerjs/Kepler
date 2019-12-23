
Template.controlSwitch.onCreated(function() {
	Session.set('geojsonLabel','');
});

Template.controlSwitch.helpers({
	geojsonLabel:  function() {
		return Session.get('geojsonLabel');
	}
});

Template.controlSwitch.events({
	'click a': function(e,tmpl) {
		K.Map.cleanGeojson();
		Session.set('geojsonLabel','');		
	}
});
