
Meteor.startup(function() {

	Accounts.config({
		forbidClientAccountCreation: !K.settings.public.accounts.creation
	});

	if(Accounts.ui) {

		if(Accounts._loginButtonsSession) {
			Accounts._loginButtonsSession.set('dropdownVisible', true);
			Accounts._loginButtonsSession.set('inChangePasswordFlow', true);
		}

		Accounts.ui.config({
			passwordSignupFields: K.settings.public.accounts.ui.passwordSignupFields
		});
	}
});
