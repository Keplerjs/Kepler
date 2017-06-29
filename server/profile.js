
confirmFriends = function(userId, addUserId) {
	//remove from pending
	Users.update(userId, {$pull: {usersReceive: addUserId} });
	Users.update(userId, {$addToSet: {friends: addUserId} });
	//add to friends list
	Users.update(addUserId, {$pull: {usersPending: userId} });
	Users.update(addUserId, {$addToSet: {friends: userId} });

	console.log('confirmFriends Added', userId, addUserId);
};

Meteor.methods({
	setLoc: function(loc) {
		//check(loc, [Number])

		if(!this.userId) return null;

		var userData = Meteor.user()
		
		console.log('setLoc', userData.username, loc);

		if(K.util.valid.loc(loc))
		{
			var shift = K.util.geo.distance(userData.loclast, loc);

			if(userData.loclast===null || shift >= Meteor.settings.public.gpsMinShift)
			{
				var nearPlace = Places.findOne({
						loc: {
							'$near': loc,
							'$maxDistance': K.util.geo.meters2rad(Meteor.settings.public.checkinMaxDist)
						}
					});

				if(nearPlace)//automatic check-in
				{
					if(nearPlace._id != userData.checkin)
						Meteor.call('addCheckin', nearPlace._id);
				}
				else		//automatic check-out
					Meteor.call('removeCheckin', userData.checkin);
				
				Users.update(this.userId, {
					$set: {
						loc: loc,
						loclast: loc,
						'settings.map.center': loc
					}
				});
				console.log('setLoc', _.pick(userData,'loc','loclast','checkin'), loc);
			}
			else
				Users.update(this.userId, {
					$set: {
						loc: userData.loclast
					}
				});
		}
		else
			Users.update(this.userId, {
				$set: {
					loc: null
				}
			});
	},
	addCheckin: function(placeId) {

		//TODO spostare in /server/profile.js

		if(!this.userId || !placeId) return null;

		var placeData = Places.findOne(placeId),
			userData = Meteor.user();

 		if(userData.checkin)
 			Places.update(userData.checkin, {
 					$pull: {checkins: this.userId}
 				});

		Places.update(placeId, {
				$addToSet: {
					checkins: this.userId, hist: this.userId
				}
			});
		Users.update(this.userId, {
				$set: {
					checkin: placeId,
					loc: null,
					loclast: placeData.loc,
					'settings.map.center': placeData.loc
				},
				$addToSet: {
					hist: placeId
				}
			});
		
		console.log('addCheckin', userData.username, placeData.name);
	},
	removeCheckin: function(placeId) {

		if(!this.userId || !placeId) return null;

		Places.update(placeId, {
				$pull: {
					checkins: this.userId
				}
			});
		Users.update(this.userId, {
				$set: {
					checkin: null
				}
			});
		
		console.log('removeCheckin', this.userId, placeId);
	},	
	friendAdd: function(pendUserId) {
		
		if(!this.userId || this.userId===pendUserId) return null;

		Users.update(this.userId, {$addToSet: {usersPending: pendUserId} });
		Users.update(pendUserId, {$addToSet: {usersReceive: this.userId} });

		console.log('friendAdd Pending', this.userId, pendUserId);
	},
	friendConfirm: function(confirmUserId) {
		
		if(!this.userId || this.userId===confirmUserId) return null;

		confirmFriends(this.userId, confirmUserId);

		console.log('friendConfirm', this.userId, confirmUserId);
	},
	friendDel: function(delUserId) {

		if(!this.userId) return null;

		Users.update(this.userId, {$pull: {friends: delUserId} });
		Users.update(delUserId, {$pull: {friends: this.userId} });
		
		console.log('friendDel', this.userId, delUserId);
	},
	friendBlock: function(blockUserId) {

		if(!this.userId) return null;
		
		Users.update(this.userId, {$pull: {friends: blockUserId} });
		Users.update(blockUserId, {$pull: {friends: this.userId} });
		Users.update(this.userId, {$addToSet: {usersBlocked: blockUserId} });

		console.log('friendBlock', this.userId, blockUserId);
	},	
	addFavorite: function(placeId) {

		if(!this.userId) return null;

		Places.update(placeId, {$inc: {rank: 1} });
		Users.update(this.userId, {$addToSet: {favorites: placeId} });
		
		console.log('addFavorite', this.userId, placeId);
	},
	removeFavorite: function(placeId) {
		
		if(!this.userId) return null;

		Places.update({_id: placeId, rank: {$gt: 0} }, {$inc: {rank: -1} });
		Users.update(this.userId, {$pull: {favorites: placeId} });
		
		console.log('removeFavorite', this.userId, placeId);
	}
});