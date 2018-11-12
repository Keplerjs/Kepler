
Template.formLogin.helpers({
	enterRoute: function() {
		return K.settings.public.router.enterRoute;
	},
	classnames: function() {
		var sets = K.settings.public.accounts,
			serv = sets.services,
			c = '';
		if(!sets.creation)
			c += ' no-accounts-creation';
		else {
			if(!serv.facebook) c += ' no-accounts-facebook';
			if(!serv.google) c += ' no-accounts-google';
			if(!serv.github) c += ' no-accounts-github';
			if(!serv.twitter) c += ' no-accounts-twitter';
			if(!serv.openstreetmap) c += ' no-accounts-openstreetmap';
		}
		return c;
	}
})