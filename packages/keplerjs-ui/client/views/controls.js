
Template.controlAlert.helpers({
	text: function() {
		return Session.get('alert');
	}
});

Template.controlAlert.events({
	'click a.close': function(e, tmpl) {
		
		console.log('e click')
		Session.set('alert','');
	}
});
