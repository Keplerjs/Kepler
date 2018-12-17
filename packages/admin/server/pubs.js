
Meteor.publish('adminUserById', function(userId) {

	if(K.Admin.isMe() && userId)
	{
		var userCur = K.findAdminUserById(userId),
			userData = userCur.fetch()[0],
			retCurs = [],
			placeIds = [];
		
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