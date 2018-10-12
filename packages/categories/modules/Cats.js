
Kepler.Cats = {

	allCats: K.settings.public.categories.cats.place,

	activeCats: [],

	sanitize: function(cats) {
		var self = this;
		
		cats = _.isArray(cats) ? cats : [cats];
		
		if(self.activeCats.length != _.keys(self.allCats).length) {
			
			_.each(self.allCats, function(v, k) {
				if(v){
					self.activeCats.push(k);
				}
			});
		}

		return _.filter(cats, function(v) {
			return _.contains(self.activeCats, v);
		});
	}
}
