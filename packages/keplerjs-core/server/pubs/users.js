
Meteor.publish('userById', function(userId) {

	if(this.userId && userId)
	{
		var userCur = K.findUserById(userId),
			userData = userCur.fetch()[0],
			retCurs = [],
			placeIds = [];

		retCurs.push(userCur);

		if(userData && _.contains(userData.usersBlocked, this.userId)) {
			//user block me
			console.log('Pub: userById from Blocked user', userData.username)
			return K.findUsersByIds([userId]);
		}

		if(userData && _.contains(userData.friends, this.userId))	//is my friend
		{
			userData = K.findFriendById(userId).fetch()[0];	//full fields

			if(userData.friends.length > 0)
				retCurs = [ K.findUsersByIds( _.union(userId, userData.friends) ) ];

			placeIds = _.union(userData.checkin, userData.hist);

			retCurs.push( K.findPlacesByIds(placeIds) );
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
		var cur = K.findUsersByName(initial);
		console.log('Pub: usersByName', "'"+initial+"'", cur ? cur.count() : 0 );
		return cur;
	}
	else
		this.ready();	
});

Meteor.publish('usersByIds', function(usersIds) {

	console.log('Pub: usersByIds', usersIds);

	if(this.userId)
		return K.findUsersByIds(usersIds);
	else
		this.ready();
});

Meteor.publish('friendsByIds', function(usersIds) {

	console.log('Pub: friendsByIds', this.userId);

	//TODO check friends in profile.friends

	if(this.userId)
		return [
			K.findFriendsByIds(usersIds),
			K.findPlacesByCheckins(usersIds)
		];
	else
		this.ready();
});

Meteor.publish('usersByDate', function() {

	console.log('Pub: usersByDate');

	if(this.userId)
		return K.findUsersByDate();
	else
		this.ready();	
});
