//http://docs.meteor.com/#meteor_loginwithexternalservice
//https://github.com/lirbank/meteor-accounts-merge-example
Meteor.startup(function () {
	//http://developers.facebook.com/docs/authentication/permissions/
	Accounts.loginServiceConfiguration.remove({service: 'facebook'});
	Accounts.loginServiceConfiguration.insert(Meteor.settings.accounts.facebook);
	//https://cloud.google.com/console
	Accounts.loginServiceConfiguration.remove({service: 'google'});	
	Accounts.loginServiceConfiguration.insert(Meteor.settings.accounts.google);
	//Accounts.loginServiceConfiguration.remove({service: 'twitter'});
	//Accounts.loginServiceConfiguration.insert(Meteor.settings.accounts.twitter);
	Accounts.emailTemplates.siteName = Meteor.settings.public.siteName;
	Accounts.emailTemplates.from = Meteor.settings.public.siteEmail;
});

/*Accounts.validateNewUser(function (user) {
	
	console.log('validateNewUser',user);

  if (user.username && user.username.length >= 3)
    return true;
  throw new Meteor.Error(403, "Username must have at least 3 characters");
});*/


Accounts.onLogin(function(login) {

	if(!login.user.locmap) {
	
		var ip = login.connection.clientAddress!='127.0.0.1' ? login.connection.clientAddress : login.connection.httpHeaders['x-real-ip'],
			geoip = Climbo.geodata.geoip(ip);

		Meteor.users.update(login.user._id, {$set: {locmap: geoip.loc }});
	}
	console.log('Login:',login.user.username);
});

Accounts.onLoginFailure(function() {
	console.log('LoginFailure:',arguments);
});

Accounts.onCreateUser(function(options, user) {

	var name = '',
		username = '',
		emails = [{
			address: null,
			verified: false
		}],
		avatar = '',
		gender = null,
		lang = Meteor.settings.public.langDef,
		city = '';		

	if(user.username)
	{
		name = user.username;
		username = user.username;
		avatar = '/images/avatar.png';
		emails = user.emails;
		//TODO lang from browser
	}
	else if(user.services.facebook)
	{
		name = user.services.facebook.name;
		username = user.services.facebook.username;
		avatar = 'http://graph.facebook.com/'+user.services.facebook.id+'/picture';
		gender = user.services.facebook.gender;
		lang = user.services.facebook.locale.substr(0,2);		
		emails = [{
			address: user.services.facebook.email,
			verified: true
		}];
	}
	else if(user.services.google)
	{
		name = user.services.google.name;
		username = _.str.slugify(name);
		avatar = user.services.google.picture;
		gender = user.services.google.gender;
		lang = user.services.google.locale.substr(0,2);		
		emails = [{
			address: user.services.google.email,
			verified: user.services.google.verified_email
		}];
	}
	// else if(user.services.twitter) {
	// 	name = user.services.twitter.name;
	// 	username = user.services.twitter.screenName;
	// 	avatar = 'http://twitter.com/api/users/profile_image/'+username;
	// }
	
	var newuser = _.extend(user, Climbo.schemas.user, {
		name: name,
		username: username,
		lang: lang,
		emails: emails, 
		avatar: avatar,
		gender: gender
	});

	console.log('New Account:', username);

	return newuser;
});
