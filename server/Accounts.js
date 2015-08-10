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
		city = '',
		likeplaces = ['rock'];		

	
	console.log('New Account:', options, user);

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
	
	return _.extend(user, {
		username: username,	//username used in urls
		name: name,			//display name
		emails: emails, 
		avatar: avatar,
		gender: gender,
		lang: lang,
		city: city,
		likeplaces: likeplaces,	//tipologia climber i18n.places
		//TODO rename in types

		loc: null,			//current gps position
		loclast: null,		//lat gps position
		locmap: null,		//last center of map
		checkin: null,		//id Place where I am
		online: 0,			//stato di visibilita rispetto ai miei friends
		onlinelast: null,	//last online status datetime
		mob: 0,				//if my device is mobile
		notif: [],			//notifiche, messaggi non letti, eventi in places preferite, nuovi friends	
		favorites: [],		//id place preferiti		
		friends: [],		//ids users friends
		convers: [], 		//ids conversations publics and privates
		hist: [],			//last places visited
		events: [],			//places in calendar
		settings: {}		//user custom settings
	});
});
