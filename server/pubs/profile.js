
Meteor.publish('currentUser', function() {

	if(this.userId) {
		
		var userCur = getCurrentUser(this.userId),

			userData = userCur.fetch()[0],
			retCurs = [];

		retCurs.push(userCur);

		if(userData.checkin)
			retCurs.push( getPlaceById(userData.checkin) );

		return retCurs;
	}
	else
		this.ready();
});
