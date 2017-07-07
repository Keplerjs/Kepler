/*
	Debugger and admnistrations methods
*/

Kepler.Admin = {
	
	method: {},	//list of server methods

	usersByName: {},
	placesByName: {},

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

	methods: function(defs) {	//server
	
		var self = this;

		_.each(defs, function(func, name) {
			if(!self.method[name])
				self.method[name] = func;
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
					if(!self[name]){
						self[name] = function() {
							return Meteor.apply(name, arguments);
						};
					}
				});
			}
		});
	}
};
