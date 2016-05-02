/*
	class Place with Google StreetView support
*/
Kepler.Place.include({

	cache: {
		stview: null
	},

	loadStreetView: function() {

		var self = this;

		if(!self.cache.stview)
			Meteor.call('getStreetViewById', self.id, function(err, stviewUrl) {

				console.log('getStreetViewById',stviewUrl);
				if(stviewUrl)
				{
					self.cache.stview = stviewUrl;
					self.update();
				}
			});
	},
	
	getStview: function() {	//deve essere sempre un metodo reattivo
		this._dep.depend();
		return this.stview;
	}
});