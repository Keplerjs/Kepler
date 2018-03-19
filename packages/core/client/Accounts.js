
if(Accounts.ui) {
	Meteor.startup(function() {	
		Accounts.ui.config({
			passwordSignupFields: K.settings.public.accounts.ui.passwordSignupFields
		});
	});
}
