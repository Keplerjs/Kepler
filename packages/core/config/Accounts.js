
Meteor.startup(function() {

	if(Meteor.isClient)
	{
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
	}
	else if(Meteor.isServer)
	{
		//https://docs.meteor.com/api/accounts-multi.html#AccountsCommon-config
		//TODO 	Accounts.oauth.unregisterService('facebook');
		//https://forums.meteor.com/t/disable-accounts-ui-social-logins-at-runtime/46479

		Accounts.config({
			sendVerificationEmail: K.settings.accounts.verifyEmail
		});

		var services = [];
		_.each(K.settings.accounts, function(conf, key) {
			if(conf.service) {
				var service = _.pick(conf,'service');
				//TODO replace with upsert()
				ServiceConfiguration.configurations.remove(service);
				ServiceConfiguration.configurations.insert(conf);
				services.push(service.service)
			}
		});

		console.log('Accounts: services', services.join(','));

		Accounts.emailTemplates.from = K.settings.accounts.emailTemplates.from;
		Accounts.emailTemplates.verifyEmail = {
		   subject() {
		      return i18n('email_verifyEmail_subject');
		   },
		   text(user, url) {
		      return i18n('email_verifyEmail_text',user.username, url);
		   }
		};
	}
});
