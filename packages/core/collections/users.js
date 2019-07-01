
Users = Meteor.users;

if(Meteor.isServer)
	Users._ensureIndex({"loc": "2d"});

Users.allow({
	update: function (userId, doc, fields, modifier) {
		return userId && userId === doc._id;
	}
});

/**
 * Automatic Check-in/Check-out in places
 * @param  {[type]} userId     [description]
 * @param  {[type]} doc        [description]
 * @param  {[type]} fieldNames [description]
 * @param  {[type]} modifier   [description]
 * @return {[type]}            [description]
 */
Users.after.update(function(userId, user, fieldNames, modifier, options) {

	if( K.settings.public.map.checkinAutomatic && _.contains(fieldNames,'loc') && user.loc)
	{

		//console.log('users.after.update loc ', user.username, K.Util.geo.locRound(user.loc).join());
		var w = {},
			dist = K.Util.geo.meters2rad(K.settings.public.map.checkinMaxDist);

		//TODO replace with minDistance
		// https://docs.mongodb.com/manual/reference/operator/query/minDistance/
		
		if(K.settings.public.map.checkinGeometry) {
			w =	{
				'geometry': {
					'$nearSphere': {
						'$geometry': K.Util.geo.point(user.loc),
						'$maxDistance': K.settings.public.map.checkinMaxDist
					}
				}
			};
		}
		else {
			w = {
				'loc': {
					'$near': user.loc,
					'$maxDistance': dist
				}
			};
		};

		/*
		if(K.settings.public.map.checkinGeometry) {
			w = {
				'geometry.type': {
					'$ne': 'Point'
				},
				'geometry': {
					'$geoIntersects': {
						'$geometry': K.Util.geo.point(user.loc)
					}
				} 
			};
		};*/

		

		var nearPlace = Places.findOne(w);

		if(nearPlace && nearPlace._id != user.checkin) {
			K.insertCheckin(nearPlace._id, user._id);
			//console.log('Autocheck-in: ', user.username, nearPlace.name)
		}
		else {
			K.removeCheckin(user.checkin, user._id);
			//console.log('Autocheck-out: ', user.username)
		}
   	}
});
