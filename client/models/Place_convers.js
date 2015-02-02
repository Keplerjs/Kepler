/*
	class Place with Conversations support
*/
Climbo.Place.include({

	cache: {
		convers: null
	},

	loadConvers: function() {
		
		var self = this;

		if(self.data && !_.isEmpty(self.data.convers))
			return Meteor.subscribe('conversByIds', self.data.convers, function() {

				self.cache.convers = getConversByIds(self.data.convers).fetch();
			});
	}
});