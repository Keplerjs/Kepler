
if(Meteor.isClient && Accounts.ui) {
	Accounts.ui.config({
		passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
	});
}
