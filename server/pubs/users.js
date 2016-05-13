
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

			placeIds = _.union(userData.checkin, userData.hist, userData.favorites);

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

	console.log('Pub: friendsByIds', usersIds);

	if(this.userId)
		return [
			getFriendsByIds(usersIds),
			getPlacesByCheckins(usersIds)
		];
	else
		this.ready();
});


Meteor.publish('usersByPlace', function(placeId) {

	console.log('Pub: usersByPlace', placeId);

	if(this.userId && placeId)
	{
		var placeCur = getPlacesByIds([placeId]),
			placeData = placeCur.fetch()[0];

		return [
			//TODO add place Cur
			placeCur,
			getUsersByIds(placeData.checkins)
		];
	}
	else
		this.ready();	
});
