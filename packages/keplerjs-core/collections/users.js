
Users = Meteor.users;

if(Meteor.isServer)
	Users._ensureIndex({"loc": "2d"});


Users.allow({
	update: function (userId, doc, fields, modifier) {
		return userId && userId === doc._id;
	}
});

/**
 * Automatic check-in
 * @param  {[type]} userId     [description]
 * @param  {[type]} doc        [description]
 * @param  {[type]} fieldNames [description]
 * @param  {[type]} modifier   [description]
 * @param  {[type]} options)   {	if(_.contains(fieldNames,'loc')) {		console.log('USERS.AFTER.UPDATE location ', userId, doc.username, fieldNames);				var nearPlace [description]
 * @return {[type]}            [description]
 */
/*Users.after.update(function(userId, doc, fieldNames, modifier, options) {

	if(_.contains(fieldNames,'loc')) {

		console.log('USERS.AFTER.UPDATE location ', userId, doc.username, fieldNames);

		var nearPlace = Places.findOne({
				loc: {
					'$near': doc.loc,
					'$maxDistance': K.Util.geo.meters2rad(K.settings.public.map.checkinMaxDist)
				}
			});

		if(nearPlace)
		{
			if(nearPlace._id != doc.checkin)
				Meteor.call('addCheckin', nearPlace._id);
		}
		else		//automatic check-out
			Meteor.call('removeCheckin', doc.checkin);
   	}
});
*/