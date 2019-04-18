
if(Meteor.isClient) {
	Accounts.onLogin(function() {

	   K.Cats.loadActiveCats();

	});
}

Kepler.Cats = {

	//TODO conver in function and sort by name
	/*allCats: {
		place: [],
		user: []
	},*/
	allCats: K.settings.public.categories.cats,

	activeCats: {
		place: [],
		user: []
	},

	_dep: new Tracker.Dependency(),

	getCats: function(type) {
		this._dep.depend();
		return this.activeCats[type];
	},

	loadActiveCats: function() {
		
		var self = this;

		_.each(self.allCats.place, function(active,name) {
			if(active)
				self.activeCats.place.push(name);
		});
		_.each(self.allCats.user, function(active,name) {
			if(active)
				self.activeCats.user.push(name);
		});

		Meteor.subscribe('catsActive', function() {
			
			var cats = K.findCatsActive().fetch(),
				cplace = _.pluck(_.where(cats,{type:'place'}),'name'),
				cuser = _.pluck(_.where(cats,{type:'user'}),'name');
			
			self.activeCats = {
				place: cplace,
				user: cuser
			};
			self._dep.changed();
		});
	}
};
