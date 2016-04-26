
Pois = new Meteor.Collection('pois');

getPoisByLoc = function(ll) {

	var Cond;
	
	if(Meteor.isClient) {
		Cond = {
			'$near': ll,
			'$maxDistance': Meteor.settings.public.maxPoisDist
		};
	}
	else if(Meteor.isServer) {
		Cond = {
			'$near': {
				'$geometry': {
					'type': 'Point',
					'coordinates':[ll[1],ll[0]]
				},
				'$maxDistance': Meteor.settings.public.maxPoisDist
			}
		};
	}

	return Pois.find({
			'geometry.coordinates': Cond
		});
};

