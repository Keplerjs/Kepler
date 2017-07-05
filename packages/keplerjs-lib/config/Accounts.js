if(Meteor.isClient)
{
	Accounts.ui.config({		//non ce piu con accounts-ui-bootstrap3
		passwordSignupFields: 'USERNAME_AND_EMAIL'
	});

	accountsUIBootstrap3.map( i18n.getLanguage(), {
		loginButtonsLoggedOutPasswordService: {
			create: i18n('accountsUIBootstrap.create'),
			signIn: i18n('accountsUIBootstrap.signIn'),
			forgot: i18n('accountsUIBootstrap.forgot'),
			createAcc: i18n('accountsUIBootstrap.createAcc')
		}
	});
}