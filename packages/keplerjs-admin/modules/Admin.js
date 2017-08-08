/*
	Admnistrations modulo and Debugger methods

	it's an interal Kepler plugin (see below)
*/

Kepler.Admin = {
	
	method: {},	//list of server methods

	prefix: 'admin_',

	usersByName: {},
	placesByName: {},

	isMe: function(user) {	//check if user is an admin
		
		user = user || Meteor.user();

		if(user) {
			if(Meteor.isServer)
				return _.contains(K.settings.admin.adminUsers, user.username);

			else if(Meteor.isClient)
				return user.isAdmin;
			//set in server/admin/admin.js Accounts.onLogin
		}
		else 
			return false
	},

	call: function(method) {
		return Meteor.apply(this.prefix+method);
	},

	methods: function(defs) {	//server
	
		var self = this;
			newDef = {};

		_.each(defs, function(func, name) {
			name = self.prefix+name;
			if(!self.method[name]){
				self.method[name] = func;
				newDef[name] = func;
			}
		});

		Meteor.methods(newDef);
	},

	loadMethods: function() {	//client

		var self = this;

		Meteor.call('adminGetMethods', function(err, names) {
			if(err)
				console.warn('adminGetMethods', err);
			else {
				//console.log('Admin: methods ', names)
				_.each(names, function(name) {
					var localname = name.replace(self.prefix,'');
					if(!self[localname]){
						self[localname] = function() {
							return Meteor.apply(name, arguments);
						};
					}
				});
			}
		});
	}
};
