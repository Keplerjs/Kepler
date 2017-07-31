/*
	Admnistrations modulo and Debugger methods

	it's an interal Kepler plugin (see below)
*/

Kepler.Admin = {
	
	method: {},	//list of server methods

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


Meteor.startup(function() {

	K.Plugin({
		name: 'admin',
		placeholders: {
			panelPlace: 'panelPlace_admin',
			panelUser: 'panelUser_admin',
			//popupPlace: 'popupPlace_admin',
			popupCursor: 'popupCursor_admin'
		},
		schemas: {
			user: {
				isAdmin: 0
			}
		},
		filters: {
			currentUser: {
				fields: {
					isAdmin: 1
				}
			}
		},
		settings: {
			"admin": {
				"adminUsers": ["admin"]
			}
		}
	});

});