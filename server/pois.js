
getPoisByLoc = function(ll) {	//return array of results

	return Pois.find({'geometry.coordinates': {
				'$near': {
					'$geometry': Climbo.util.geo.createPoint([ll[1],ll[0]]),
					'$maxDistance': Meteor.settings.public.maxPoisDist
				}
			}
		},{limit: Meteor.settings.public.maxPois });
};

Meteor.methods({
	getPoisByLoc: function(loc) {

		if(!this.userId) return null;

		var pois = getPoisByLoc(loc).fetch();

		console.log('getPoisByLoc',pois.length);

		return pois;
	}
});
