Accounts.config({
	sendVerificationEmail: false,
	forbidClientAccountCreation: !Meteor.settings.public.accountCreation
});