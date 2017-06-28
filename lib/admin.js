
Kepler.admin = {
	
	methods: {},	//list of server methods

	isMe: function() {	//check if user is an admin
		if(!Meteor.isServer || !Meteor.user()) return false;
		return _.contains(Meteor.settings.adminUsers, Meteor.user().username);
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
	
		if(!K.admin.isMe()) return false;

		console.log('adminGetMethods');

		return _.keys(K.admin.methods);
	}
});
