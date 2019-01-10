
Template.panelSettings_ui_contact.events({
	'keyup #city': _.debounce(function(e) {
		var val = $(e.currentTarget).val();
		Users.update(Meteor.userId(), { $set: {'city': val } });
	}, 300),
	/*
	//TODO
	'keyup #email': _.debounce(function(e) {
		var val = $(e.target).val(),
			oldval = $(e.target).data('value'),
			feed$ = $(e.target).next('.form-control-feedback');

		if(!K.Util.valid.email(val))
			feed$.show();
		else {
			feed$.hide();
			//TODO
			// Users.update(Meteor.userId(), {
			// 	$set: {
			// 		emails: [{
			// 			address: val,
			// 			verified: val==oldval
			// 		}]
			// 	}
			// });
		}
	}, 300),
	*/	
});