
Accounts.ui.config({		//non ce piu con accounts-ui-bootstrap3
	// requestPermissions: {
	// 	facebook: ['user_likes']
	// ['user_likes',
	// 'friends_about_me',
	// 'user_birthday',
	// 'email',
	// 'user_location',
	// 'user_work_history',
	// 'read_friendlists',
	// 'friends_groups',
	// 'user_groups']
	// },
	//requestOfflineToken: {
	//	google: true
	//},
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

Accounts.onLogin(function() {
	Router.go('profile');
});