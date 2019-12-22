
Template.controlSwitch.onCreated(function() {
	
	
});

Template.controlSwitch.helpers({
	switches: function() {
		return K.Map.controls.switch.dict.all();
	}
});

Template.controlSwitch.events({
	'click a': function(e,tmpl) {
		K.Map.controls.switch.remove(this.key);
	}
});
