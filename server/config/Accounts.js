
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
			online: 1,
			isAdmin: K.admin.isMe(login.user)
		};

/*	if(Meteor.settings.geoipLocation && 
		!K.util.getPath(login.user,'settings.map.center') && 
		(geoip = K.geoapi.geoip(ip)) )
		//TODO sets['settings.map.center'] = geoip.loc;*/

	Users.update(login.user._id, {$set: sets});

	console.log('Login:',login.user.username, ip);
});

Accounts.onLoginFailure(function(e) {
	var user = e.methodArguments && e.methodArguments[0] && e.methodArguments[0].user;
	console.log('LoginFailure:', user);
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
	
	var newuser = _.extend(user, K.schemas.user, {
		username: username,		
		name: name,
		lang: lang,
		emails: emails, 
		avatar: avatar,
		gender: gender
	});

	console.log('New Account:', username);

	return newuser;
});
