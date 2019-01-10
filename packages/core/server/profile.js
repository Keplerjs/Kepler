
Meteor.methods({
	setLoc: function(loc) {
		//check(loc, [Number])

		//TODO rename in updateUserLoc

		if(!this.userId) return null;

		var userData = Meteor.user();
		
		if(K.Util.valid.loc(loc))
		{
			var shift = K.Util.geo.distance(userData.loclast, loc);
			//implicit if(loc === userData.loc)

			if(userData.loclast===null || shift >= K.settings.public.map.gpsMinShift)
			{
				Users.update(this.userId, {
					$set: {
						loc: loc,
						loclast: loc,
						'settings.map.center': loc,
						'settings.map.zoom': K.settings.public.map.showLocZoom
					}
				});
				console.log('Profile: setLoc', userData.username, loc);
			}
			else {
				Users.update(this.userId, {
					$set: {
						loc: userData.loclast
					}
				});
				console.log('Profile: setLoc', userData.username, loc);
			}
		}
		else {
			if(userData.loc !== null) {
				Users.update(this.userId, {
					$set: {
						loc: null
					}
				});
			}
		}
	},
	addCheckin: function(placeId) {

		if(!this.userId || !placeId) return null;

		K.insertCheckin(placeId, this.userId);
		
		console.log('Profile: addCheckin', placeId, this.userId);
	},
	removeCheckin: function(placeId) {

		if(!this.userId || !placeId) return null;

		K.removeCheckin(placeId, this.userId);
		
		console.log('Profile: removeCheckin', this.userId, placeId);
	},	
	friendAdd: function(pendUserId) {
		
		if(!this.userId || this.userId===pendUserId) return null;
		
/*		if(Users.find({}).count()) {
			K.updateFriendship(this.userId, pendUserId);
		}
		else {*/
			Users.update(this.userId, {$addToSet: {usersPending: pendUserId} });
			Users.update(pendUserId, {$addToSet: {usersReceive: this.userId} });
		//}

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
	/**
	 * unblock user in blocked list
	 * @param  {String} unblockUserId [description]
	 */
	userUnblock: function(unblockUserId) {

		if(!this.userId) return null;
		
		Users.update(this.userId, {
			$pull: {usersBlocked: unblockUserId}
		});

		console.log('Profile: userUnblock', this.userId, unblockUserId);
	},
	/**
	 * update username of user 
	 * @param {String} username [description]
	 * @return {String} error or sanitized username
	 */
	setUsername: function(username) {

		if(!this.userId) return null;

		console.log('Profile: setUsername', this.userId, username);

/*		if(!K.Util.valid.username(username))
			throw new Meteor.Error(500, i18n('error_novalid')+' '+i18n('error_validchars'));
		*/
		username = K.Util.sanitize.username(username);
		if(username==='') {
			throw new Meteor.Error(500, i18n('error_validchars'), username);
		}

		var user = Users.findOne({username: username}, {fields: {username:1}});

		if(user && user._id !== this.userId) {
			var usernameInc = K.Util.sanitize.nthName(username);
			throw new Meteor.Error(500, i18n('error_taken',username), usernameInc);
		}
		
		console.log('Profile: setUsername updated', this.userId, username);

		Users.update(Meteor.userId(), {
			$set: {
				'username': username
			}
		});

		return username;
	}
});