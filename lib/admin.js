
Kepler.admin = {
	
	actions: {},

	isMe: function() {
		if(!Meteor.isServer || !Meteor.user()) return false;
		return _.contains(Meteor.settings.adminUsers, Meteor.user().username);
	},

	methods: function(defs) {	//server
	
		var self = this;

		_.each(defs, function(func, name) {
			if(!self.actions[name])
				self.actions[name] = func;
		});

		Meteor.methods(defs);
	},

	loadActions: function() {	//client

		var self = this;

		Meteor.call('adminGetActions', function(err, names) {
			if(err)
				console.warn('adminGetActions', err);
			else {
				_.each(names, function(name) {
					self[name] = function() {
						return Meteor.apply(name, arguments);
					};
				});
			}
		});
	}
};

Meteor.methods({
	adminGetActions: function() {
	
		if(!K.admin.isMe()) return false;

		console.log('adminGetActions');

		return _.keys(K.admin.actions);
	}
});
