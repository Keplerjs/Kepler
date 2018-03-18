
Kepler.User.include({

	conversList: [],

	loadConvers: function(cb) {

		var self = this;

		cb = _.isFunction(cb) ? cb : $.noop;

		if(self.conversList.length)
			cb(self.conversList);
		else
			Meteor.subscribe('conversByUser', self.id, function() {
				
				self.conversList = K.findConversByUser(self.id).fetch();

				self._dep.changed();

				cb(self.conversList);
			});
	},

	getConversList: function() {
		
		this._dep.depend();

		return this.conversList;
	}
});