
Meteor.publish('usersByName', function(initial) {
	if(this.userId) {
		var cur = getUsersByName(initial);
		console.log('Pub: usersByName', "'"+initial+"'", cur ? cur.count() : 0 );
		return cur;
	}
	else
		this.ready();	
});

Meteor.publish('usersByIds', function(usersIds) {

	console.log('Pub: usersByIds', usersIds);

	if(this.userId)
		return getUsersByIds(usersIds);
	else
		this.ready();
});

Meteor.publish('friendsByIds', function(usersIds) {

//	console.log('Pub: friendsByIds', usersIds);

	if(this.userId)
		return [
			getFriendsByIds(usersIds),
			getPlacesByCheckins(usersIds)
		];
	else
		this.ready();
});

Meteor.publish('userById', function(userId) {

	if(this.userId && userId)
	{
		var userCur = getUserById(userId),
			userData = userCur.fetch()[0],
			retCurs = [],
			placeIds = [];

		retCurs.push(userCur);

		if(userData && _.contains(userData.friends, this.userId))	//is my friend
		{
			userData = getFriendById(userId).fetch()[0];	//full fields

			if(userData.friends.length > 0)
				retCurs = [ getUsersByIds( _.union(userId, userData.friends) ) ];

			placeIds = _.union(userData.hist, userData.favorites);

//			if(userData.checkin)
//				placeIds.push(userData.checkin);

			retCurs.push( getPlacesByIds(placeIds) );

			//TODO places events ed altre info
		}
		
		this.added('users', userId, userData);	//add full fields for userCur

		console.log('Pub: userById', userData.username);

		return retCurs;
	}
	else
		this.ready();
});
