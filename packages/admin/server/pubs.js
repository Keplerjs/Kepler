
Meteor.publish('adminPlaceById', function(placeId) {

	if(K.Admin.isMe() && placeId)
	{
		var placeCur = Places.find(placeId),
			placeData = placeCur.fetch()[0],
			retCurs = [];

	/*	if(placeData) {
			this.changed('places', placeId, placeData);
			//add full fields for placeCur
		}
		*/
		retCurs.push(placeCur);
		
		if(placeData) {
			var usersIds = _.union(placeData.hist, placeData.checkins, placeData.userId);
			//TODO move publish of userId in plugin edit
			//
			if(usersIds.length > 0)
				retCurs.push( K.findUsersByIds(usersIds) );
			//publish one cursor for collection users
		}

		console.log('Pub: adminPlaceById', placeId);

		return retCurs;
	}
	else
		this.ready();
});

Meteor.publish('adminUserById', function(userId) {

	if(K.Admin.isMe() && userId)
	{
		var userCur = Users.find(userId),
			userData = userCur.fetch()[0],
			retCurs = [],
			placeIds = [];
		if(userData) {
			this.added('users', userId, userData);
		}

		retCurs.push(userCur);
		
		if(userData) {
			if(userData.friends.length > 0)
				retCurs = [ K.findUsersByIds( _.union(userId, userData.friends) ) ];

			placeIds = _.union(userData.checkin, userData.hist);

			retCurs.push( K.findPlacesByIds(placeIds) );
		}
		
		console.log('Pub: adminUserById', userId);

		return retCurs;
	}
	else
		this.ready();
});
