
Meteor.publish('adminUserById', function(userId) {

	if(K.Admin.isMe() && userId)
	{
		var userCur = Users.find(userId),
			userData = userCur.fetch()[0],
			retCurs = [],
			placeIds = [];
		
		//if(userCur)

		retCurs.push(userCur);

		if(userData.friends.length > 0)
			retCurs = [ K.findUsersByIds( _.union(userId, userData.friends) ) ];

		placeIds = _.union(userData.checkin, userData.hist);

		retCurs.push( K.findPlacesByIds(placeIds) );

		if(userData) {
			this.added('users', userId, userData);
			//add full fields for userCur
		}

		console.log('Pub: adminUserById', userId);

		return retCurs;
	}
	else
		this.ready();
});


Meteor.publish('adminPlaceById', function(placeId) {

	if(K.Admin.isMe() && placeId)
	{
		var placeCur = Places.find(placeId),
			placeData = placeCur.fetch()[0],
			retCurs = [];

		retCurs.push(placeCur);
		
		if(!placeData) {
			return retCurs;
		}

		var usersIds = _.union(placeData.hist, placeData.checkins, placeData.userId);
		//TODO move publish of userId in plugin edit
		//		
		if(usersIds.length > 0)
			retCurs.push( K.findUsersByIds(usersIds) );
		//publish one cursor for collection users

		console.log('Pub: adminPlaceById', placeId);

		return retCurs;
	}
	else
		this.ready();
});