

Accounts.onLogin(function(e) {
	var ip = e && (e.connection.httpHeaders['x-real-ip'] || e.connection.clientAddress),
		user = e.user ? K.Util.getPath(e.user,'username') : '';
	
	Users.update(e.user._id, {
		$set: {
			loginAt: K.Util.time(),
			loginIp: ip
		}
	});

	console.log('Accounts: onLogin ', ip, user);
});

Accounts.onLoginFailure(function(e) {
	var ip = e.connection.httpHeaders['x-real-ip'] || e.connection.clientAddress,
		user = e.methodArguments ? K.Util.getPath(e.methodArguments[0],'user') : '';

	console.log('Accounts: onLoginFailure ', ip, user );
});

/*Accounts.validateNewUser(function (user) {
  console.log('Accounts.validateNewUser', user)
  //if (user.username && user.username.length >= 3)
  //user.name = 'NOME'+user.name;
  return true;
	//TODO blacklist names
  //throw new Meteor.Error(403, "Username must have at least 3 characters");
});*/

Accounts.onCreateUser(function(options, user) {

	var profile = {},
		username = user.username,
		name = user.username,
		lang = K.settings.public.lang || '',
		avatar = '',
		gender = null,
		emails = user.emails,
		source = {
			service: '',
			url: '',
			options: options	
		};

 	if(user.services.password) {
		source.service = 'password';
		name = user.username;
		username = user.username;
		delete options.password;
		user = _.extend({}, user, options);
		avatar = options.avatar || avatar;
	}
	else if(user.services.facebook)
	{
		source.service = 'facebook';
		source.url = user.services.facebook.link;
		name = user.services.facebook.name;
		username = user.services.facebook.username || name;
		avatar = 'http://graph.facebook.com/'+user.services.facebook.id+'/picture';
		gender = user.services.facebook.gender;
		lang = user.services.facebook.locale || '';		
		emails = [{
			address: user.services.facebook.email,
			verified: true
		}]; 
	}
	else if(user.services.instagram)
	{
		source.service = 'instagram';
		source.url = "https://www.instagram.com/"+user.services.instagram.username;
		name = user.services.instagram.full_name;
		username = user.services.instagram.username;
		avatar = user.services.instagram.profile_picture;
		lang = '';
		emails = [];
	}
	else if(user.services.google)
	{
		source.service = 'google';
		source.url = 'https://plus.google.com/'+user.services.google.id;
		name = user.services.google.name;
		username = name;
		avatar = user.services.google.picture;
		gender = user.services.google.gender;
		lang = user.services.google.locale || '';		
		emails = [{
			address: user.services.google.email,
			verified: user.services.google.verified_email
		}];
	}
	else if(user.services.github)
	{
		source.service = 'github';
		source.url = 'https://github.com/'+user.services.github.username;
		name = user.services.github.username;
		username = user.services.github.username;
		avatar = 'https://avatars.githubusercontent.com/u/'+user.services.github.id+'?s=300&v=4';
		//lang = user.services.github.locale;
		emails = [{
			address: user.services.github.email,
			verified: true
		}];
	}	
	else if(user.services.openstreetmap)
	{
		source.service = 'openstreetmap';
		source.url = "http://www.openstreetmap.org/user/"+options.profile.username;
		name = options.profile.username;
		username = options.profile.username;
		avatar = options.profile.picture;
		lang = options.profile.languages[0] || '';
		emails = [];
	}	
	//TODO else if(user.services.twitter) {
	//	source.service = 'twitter';
	// 	name = user.services.twitter.name;
	// 	username = user.services.twitter.screenName;
	// 	avatar = 'http://twitter.com/api/users/profile_image/'+username;
	// }
	// 
	
	var retuser = _.extend({}, K.schemas.user, user, {
		createdAt: K.Util.time(),
		name: K.Util.sanitize.name(name),
		username: K.Util.sanitize.username(username),
		lang: (''+lang).substr(0,2),
		profile: profile,		
		avatar: avatar,
		gender: gender,
		emails: emails,
		source: source
	});

	if(!retuser.source.service!=='password') {

		var userOld = Users.findOne({
			username: retuser.username
		},{
			fields: { username:1 }
		});

		if(userOld) {
			retuser.username = K.Util.sanitize.nthName(userOld.username);
			console.log('Accounts: rename exists username', userOld.username, retuser.username);
		}
	}

	console.log('Accounts: onCreateUser ', retuser.username);

	return retuser;
});
