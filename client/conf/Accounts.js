
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


accountsUIBootstrap3.map('it', {
	loginButtonsLoggedOutPasswordService: {
		create: "Crea",
		signIn: "Accedi",
		forgot: "Password dimenticata?",
		createAcc: "Crea un account"
	}
    // ...
});

accountsUIBootstrap3.setLanguage('it');
