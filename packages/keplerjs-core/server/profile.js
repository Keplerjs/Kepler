
Meteor.methods({
	setLoc: function(loc) {
		//check(loc, [Number])

		//TODO rename in updateUserLoc

		if(!this.userId) return null;

		var userData = Meteor.user()
		
		console.log('Profile: setLoc', userData.username, loc);

		if(K.Util.valid.loc(loc))
		{
			var shift = K.Util.geo.distance(userData.loclast, loc);

			if(userData.loclast===null || shift >= K.settings.public.map.gpsMinShift)
			{
				var nearPlace = Places.findOne({
						loc: {
							'$near': loc,
							'$maxDistance': K.Util.geo.meters2rad(K.settings.public.map.checkinMaxDist)
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
		
		console.log('Profile: addCheckin', userData.username, placeData.name);
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
		
		console.log('Profile: removeCheckin', this.userId, placeId);
	},	
	friendAdd: function(pendUserId) {
		
		if(!this.userId || this.userId===pendUserId) return null;

		Users.update(this.userId, {$addToSet: {usersPending: pendUserId} });
		Users.update(pendUserId, {$addToSet: {usersReceive: this.userId} });

		console.log('Profile: friendAdd Pending', this.userId, pendUserId);
	},
	friendConfirm: function(confirmUserId) {
		
		if(!this.userId || this.userId===confirmUserId) return null;

		K.updateFriendship(this.userId, confirmUserId);

		console.log('Profile: friendConfirm', this.userId, confirmUserId);
	},
	friendDel: function(delUserId) {

		if(!this.userId) return null;

		Users.update(this.userId, {$pull: {friends: delUserId} });
		Users.update(delUserId, {$pull: {friends: this.userId} });
		
		console.log('Profile: friendDel', this.userId, delUserId);
	},
	userBlock: function(blockUserId) {

		if(!this.userId) return null;
		
		Users.update(this.userId, {
			$pull: {friends: blockUserId},
			$addToSet: {usersBlocked: blockUserId}
		});
		Users.update(blockUserId, {
			$pull: {
				friends: this.userId,
				usersPending: this.userId,
				usersReceive: this.userId
			}
		});

		console.log('Profile: userBlock', this.userId, blockUserId);
	},
	userUnblock: function(unblockUserId) {

		if(!this.userId) return null;
		
		Users.update(this.userId, {
			$pull: {usersBlocked: unblockUserId}
		});

		console.log('Profile: userUnblock', this.userId, unblockUserId);
	}
});