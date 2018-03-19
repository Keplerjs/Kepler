
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

	if(_.contains(fieldNames,'loc') && user.loc) {

		//console.log('users.after.update loc ', user.username, K.Util.geo.roundLoc(user.loc).join());

		var nearPlace = Places.findOne({
				loc: {
					'$near': user.loc,
					'$maxDistance': K.Util.geo.meters2rad(K.settings.public.map.checkinMaxDist)
				}
			});

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
