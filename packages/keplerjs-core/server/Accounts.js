
Meteor.startup(function() {	
	Accounts.config({
		sendVerificationEmail: K.settings.accounts.verifyEmail,
		forbidClientAccountCreation: !K.settings.accounts.creation
	});

	_.each(K.settings.accounts, function(conf, key) {
		if(conf.service) {
			console.log('Accounts: config ', key)
			//Accounts.loginServiceConfiguration.remove(_.pick(conf,'service'));
			//Accounts.loginServiceConfiguration.insert(conf);
			ServiceConfiguration.configurations.remove(_.pick(conf,'service'));
			ServiceConfiguration.configurations.insert(conf);
		}
	});
});

Accounts.onLogin(function(e) {
	var ip = e && (e.connection.httpHeaders['x-real-ip'] || e.connection.clientAddress);
	console.log('Accounts: onLogin ',e.user.username, ip);
});

Accounts.onLoginFailure(function(e) {
	var ip = e.connection.httpHeaders['x-real-ip'] || e.connection.clientAddress;
	console.log('Accounts: onLoginFailure ', e.methodArguments, ip);
});

/*Accounts.validateNewUser(function (user) {
  console.log('Accounts.validateNewUser', user)
  //if (user.username && user.username.length >= 3)
  //  return true;
	//TODO blacklist names
  throw new Meteor.Error(403, "Username must have at least 3 characters");
});*/

Accounts.onCreateUser(function(options, user) {

	var profile = {},
		username = user.username,
		name = user.username,
		lang = K.settings.public.lang,
		avatar = '',
		gender = null,
		emails = user.emails,
		source = {
			service: 'keplerjs',
			url: '',
			options: options	
		};

	if(user.services.facebook)
	{
		source.service = 'facebook';
		source.url = user.services.facebook.link;
		name = user.services.facebook.name;
		username = user.services.facebook.username || name;
		avatar = 'http://graph.facebook.com/'+user.services.facebook.id+'/picture';
		gender = user.services.facebook.gender;
		lang = user.services.facebook.locale;		
		emails = [{
			address: user.services.facebook.email,
			verified: true
		}]; 
	}
	else if(user.services.google)
	{
		source.service = 'google';
		source.url = '';//user.services.google;
		name = user.services.google.name;
		username = name;
		avatar = user.services.google.picture;
		gender = user.services.google.gender;
		lang = user.services.google.locale;		
		emails = [{
			address: user.services.google.email,
			verified: user.services.google.verified_email
		}];
	}
	else if(user.services.openstreetmap)
	{
		source.service = 'openstreetmap';
		source.url = "http://www.openstreetmap.org/user/"+options.profile.username;
		name = options.profile.username;
		username = options.profile.username;
		avatar = options.profile.picture;
		lang = options.profile.languages[0];
/*		emails = [{
			address: user.services.openstreetmap.email,
			verified: user.services.openstreetmap.verified_email
		}];*/
	}
	//TODO else if(user.services.twitter) {
	//	source.service = 'twitter';
	// 	name = user.services.twitter.name;
	// 	username = user.services.twitter.screenName;
	// 	avatar = 'http://twitter.com/api/users/profile_image/'+username;
	// }
	
	var retuser = _.extend({}, user, K.schemas.user, {
		createdAt: K.Util.time(),
		name: K.Util.sanitize.name(name),
		username: K.Util.sanitize.username(username),
		lang: lang.substr(0,2),
		profile: profile,		
		avatar: avatar,
		gender: gender,
		emails: emails,
		source: source
	});

	console.log('Accounts: onCreateUser ', source.service, retuser.username);

	return retuser;
});
