/*
	Debugger and admnistrations methods
*/
Kepler.Admin = {
	
	methods: {},	//list of server methods

	isMe: function(user) {	//check if user is an admin
		
		user = user || Meteor.user();

		if(user) {
			if(Meteor.isServer)
				return _.contains(Meteor.settings.adminUsers, user.username);

			else if(Meteor.isClient)
				return user.isAdmin;//Accounts.onLogin
		}
		else 
			return false
	},

	addMethods: function(defs) {	//server
	
		var self = this;

		_.each(defs, function(func, name) {
			if(!self.methods[name])
				self.methods[name] = func;
		});

		Meteor.methods(defs);
	},

	loadMethods: function() {	//client

		var self = this;

		Meteor.call('adminGetMethods', function(err, names) {
			if(err)
				console.warn('adminGetMethods', err);
			else {
				_.each(names, function(name) {
					self.methods[name] = function() {
						return Meteor.apply(name, arguments);
					};
				});
			}
		});
	}
};

Meteor.methods({
	adminGetMethods: function() {
	
		if(!K.Admin.isMe()) return false;

		console.log('Admin: adminGetMethods');

		return _.keys(K.Admin.methods);
	}
});
