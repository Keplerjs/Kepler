
Kepler.Cats = {

	//TODO conver in function and sort by name
	allCats: K.settings.public.categories.cats,

	activeCats: {
		place: [],
		user: []
	},

	sanitize: function(cats, type) {
		var self = this;
		
		cats = _.isArray(cats) ? cats : [cats];
		
		if(self.activeCats[type].length != _.keys(self.allCats[type]).length) {
			
			_.each(self.allCats[type], function(v, k) {
				if(v){
					self.activeCats[type].push(k);
				}
			});
		}

		return _.filter(cats, function(v) {
			return _.contains(self.activeCats[type], v);
		});
	}
}
