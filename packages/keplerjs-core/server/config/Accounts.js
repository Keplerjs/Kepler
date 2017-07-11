
Meteor.startup(function () {	
	Accounts.config({
		sendVerificationEmail: false,
		forbidClientAccountCreation: !Meteor.settings.public.accountCreation
	});
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

Accounts.onLogin(function(login) {

	var ip = login.connection.httpHeaders['x-real-ip'] || login.connection.clientAddress,
		sets = {
			online: 1
		};
		
	Users.update(login.user._id, {$set: sets});

	console.log('Login:',login.user.username, ip);
});

Accounts.onLoginFailure(function(e) {
	var user = e.methodArguments && e.methodArguments[0] && e.methodArguments[0].user;
	console.log('LoginFailure:', user);
});

Accounts.validateNewUser(function (user) {
  if (user.username && user.username.length >= 3)
    return true;
	//TODO blacklist names
  throw new Meteor.Error(403, "Username must have at least 3 characters");
});

Accounts.onCreateUser(function(options, user) {

	var gender = null,
		lang = Meteor.settings.public.langDef
		emails = [{
			address: null,
			verified: false
		}];

		//TODO lang from browser
	
	if(user.services.facebook)
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
	
	var retuser = _.extend(user, K.schemas.user, {
		username: K.Util.sanitizeName(username),
		name: name,
		lang: lang,
		emails: emails, 
		avatar: avatar,
		gender: gender
	});

	console.log('New Account:', retuser.username);

	return retuser;
});
