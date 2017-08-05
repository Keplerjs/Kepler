/*

	//TODO https://docs.meteor.com/api/passwords.html#Accounts-createUser

*/
Meteor.startup(function () {	
	Accounts.config({
		sendVerificationEmail: K.settings.accounts.verifyEmail,
		forbidClientAccountCreation: !K.settings.accounts.creation
	});

	_.each(K.settings.accounts, function(conf, key) {
		if(conf.service) {
			Accounts.loginServiceConfiguration.remove(_.pick(conf,'service'));
			Accounts.loginServiceConfiguration.insert(conf);
		}
	});

/*	Accounts.loginServiceConfiguration.remove({service: 'facebook'});
	Accounts.loginServiceConfiguration.insert(K.settings.accounts.facebook);
	
	Accounts.loginServiceConfiguration.remove({service: 'google'});	
	Accounts.loginServiceConfiguration.insert(K.settings.accounts.google);*/
	//Accounts.loginServiceConfiguration.remove({service: 'twitter'});
	//Accounts.loginServiceConfiguration.insert(K.settings.accounts.twitter);
	//TODO Accounts.emailTemplates.siteName = ;
	//TODO Accounts.emailTemplates.from = ;
});

Accounts.onLogin(function(e) {

	var ip = e.connection.httpHeaders['x-real-ip'] || e.connection.clientAddress;
	
	console.log('Accounts: onLogin ',e.user.username, ip);

	if(e.user && e.user._id)
		Users.update(e.user._id, {
			$set: {
				online: 1
			}
		});
});

Accounts.onLoginFailure(function(e) {
	var ip = e.connection.httpHeaders['x-real-ip'] || e.connection.clientAddress,
		username = e.methodArguments[0].user.username;
	console.log('Accounts: onLoginFailure ', username, ip);
});

/*
//TODO
Accounts.validateNewUser(function (user) {
  if (user.username && user.username.length >= 3)
    return true;
	//TODO blacklist names
  throw new Meteor.Error(403, "Username must have at least 3 characters");
});
*/
Accounts.onCreateUser(function(options, user) {

	var profile = options.profile,
		username = user.username,
		name = user.username,
		lang = K.settings.public.lang,
		avatar = '',
		gender = null,
		emails = user.emails;

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
	//TODO else if(user.services.twitter) {
	// 	name = user.services.twitter.name;
	// 	username = user.services.twitter.screenName;
	// 	avatar = 'http://twitter.com/api/users/profile_image/'+username;
	// }
	
	var retuser = _.extend(user, K.schemas.user, {
		createdAt: K.Util.time(),
		username: K.Util.sanitizeName(username),
		profile: profile,		
		name: name,
		lang: lang,
		avatar: avatar,
		gender: gender,
		emails: emails
	});

	console.log('Accounts: onCreateUser ', retuser.username);

	return retuser;
});
