/*
	Admnistrations modulo and Debugger methods

	it's an interal Kepler plugin (see below)
*/

Kepler.Admin = {
	/**
	 * index of methods registered
	 * @type {Object}
	 */
	method: {},	//list of server methods
	/**
	 * admin methods prefix name
	 * @type {String}
	 */
	prefix: 'admin_',

	/**
	 * index of users by name, for debugging
	 * @type {Object}
	 */
	usersByName: {},
	placesByName: {},

	/**
	 * check if the current user is an admin
	 * @param  {Object}  user specify user if not current user
	 * @return {Boolean}      [description]
	 */
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
		args = _.rest(arguments);
		var l = _.last(args);
		cb = _.isFunction(l) ? l : null;
		return Meteor.apply(this.prefix+method, args, cb);
	},

	methods: function(defs) {	//only server
	
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

	loadMethods: function(cb) {	//only client

		var self = this;

		Meteor.call('adminGetMethods', function(err, names) {
			_.each(names, function(name) {
				var localname = name.replace(self.prefix,'');
				if(!self[localname]){
					self[localname] = function() {
						return Meteor.apply(name, arguments);
					};
					//index methods also in client
					self.method[localname] = self[localname];
				}
			});
			if(_.isFunction(cb))
				cb( _.keys(self.method) );

			//console.log('Admin: methods loaded')
		});
	}
};
