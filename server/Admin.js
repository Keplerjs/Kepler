/*
	DEBUGGING FUNCTIONS
*/
cleanFriendsByUserId = function(userId) {

	Meteor.users.update(userId, {
		$set: {
			friends: [],
			usersBlocked: [],			
			usersPending: [],
			usersReceive: []
		}
	});
	
	console.log('cleanFriendsByUserId', userId);
}


Meteor.methods({
	cleanFriendsByUserId: function(userId) {
		
		if(!this.userId) return null;

		//TODO check User is Admin

		cleanFriendsByUserId(userId);
	}
});