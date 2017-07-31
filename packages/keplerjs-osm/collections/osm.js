
Osm = new Mongo.Collection('osm');

findOsmByLoc = function(ll) {
	var where;
	
	if(Meteor.isClient) {
		where = {
			'$near': ll,
			'$maxDistance': 1000
		};
	}
	else if(Meteor.isServer) {
		where = {
			'$near': {
				'$geometry': {
					'type': 'Point',
					'coordinates': [ll[1],ll[0]]
				},
				'$maxDistance': 1000
			}
		};
	}

	return Osm.find({
			'geometry.coordinates': where
		}, {limit:10 });
};

