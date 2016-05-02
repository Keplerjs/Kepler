if(Meteor.isClient)
{
	Accounts.ui.config({		//non ce piu con accounts-ui-bootstrap3
		passwordSignupFields: 'USERNAME_AND_EMAIL'
	});

	accountsUIBootstrap3.map( i18n.getLanguage(), {
		loginButtonsLoggedOutPasswordService: {
			create: i18n('pkgs.accountsUIBootstrap3.loginButtonsLoggedOutPasswordService.create'),
			signIn: i18n('pkgs.accountsUIBootstrap3.loginButtonsLoggedOutPasswordService.signIn'),
			forgot: i18n('pkgs.accountsUIBootstrap3.loginButtonsLoggedOutPasswordService.forgot'),
			createAcc: i18n('pkgs.accountsUIBootstrap3.loginButtonsLoggedOutPasswordService.createAcc')
		}
	});
}
