Kepler.Cats = {

	//TODO conver in function and sort by name
	allCats: {
		place: [],
		user: []
	},
	
	activeCats: {
		place: [],
		user: []
	},

	sanitize: function(cats, type) {
		var self = this;
		
		cats = _.isArray(cats) ? cats : [cats];

		return _.filter(cats, function(v) {
			return _.contains(self.activeCats[type], v);
		});
	},

	loadActiveCats: function() {
		
		var self = this;

		Meteor.subscribe('catsByActive', function() {
			
			var dbCats = K.findCatsByActive().fetch();
			
			console.log('sub: catsByActive', dbCats)
			
		});
	}
};

if(Meteor.isClient) {
	Accounts.onLogin(function() {

	   K.Cats.loadActiveCats()

	});
}