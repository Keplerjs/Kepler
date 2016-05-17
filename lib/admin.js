
Kepler.admin = {
	
	actions: {},

	isMe: function() {
		if(!Meteor.isServer || !Meteor.user()) return false;
		return _.contains(Meteor.settings.adminUsers, Meteor.user().username);
	},

	methods: function(obj) {
	
		var self = this;

		if(Meteor.isServer) {
			
			_.each(obj, function(func, name) {

				if(!self.actions[name]) {
					self.actions[name] = func;
					Meteor.methods(_.object([name],[func]))
				}
			});
			
			console.log(self.actions)
		}
	}
};