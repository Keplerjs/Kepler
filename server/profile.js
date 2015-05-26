
getCurrentUser = function(userId) {
	return Meteor.users.find(userId, { fields: Climbo.perms.currentUser });
};

Meteor.methods({
	setUserLoc: function(loc) {

		if(!this.userId) return null;

		loc = loc || null;

		if(loc)
		{
			var userData = Meteor.user(),
				shift = Climbo.util.geo.distance(userData.loclast, loc);

			if(userData.loclast===null || shift >= Meteor.settings.public.gpsMinShift)
			{
				var nearPlace = Places.findOne({
						loc: {
							'$near': loc,
							'$maxDistance': (Meteor.settings.public.checkinMaxDist/1000)/111.12
						}
					});

				if(nearPlace)//automatic check-in
				{
					if(nearPlace._id._str != userData.checkin)
						Meteor.call('addCheckin', nearPlace._id._str);
				}
				else		//automatic check-out
					Meteor.call('removeCheckin', userData.checkin);
				
				Meteor.users.update(this.userId, {
					$set: {
						loc: loc,
						loclast: loc,
						locmap: loc
					}
				});
				console.log('setUserLoc'+Climbo.util.timeUnix(), _.pick(userData,'loc','loclast','checkin'), loc);
			}
			else
				Meteor.users.update(this.userId, {$set: {loc: userData.loclast}});
		}
		else
			Meteor.users.update(this.userId, {$set: {loc: null}});
	},
	addFriend: function(addUserId) {
		
		if(!this.userId || this.userId===addUserId) return null;

		//TODO e aggiungi campo friendsRequests

		Meteor.users.update(this.userId, {$addToSet: {friends: addUserId} });
		Meteor.users.update(addUserId, {$addToSet: {friends: this.userId} });

		console.log('addFriend', this.userId, addUserId);
	},
	removeFriend: function(delUserId) {

		if(!this.userId) return null;

		Meteor.users.update(this.userId, {$pull: {friends: delUserId} });
		Meteor.users.update(delUserId, {$pull: {friends: this.userId} });
		
		console.log('removeFriend', this.userId, delUserId);
	},
	addCheckin: function(placeId) {

		//TODO spostare in /server/profile.js

		if(!this.userId || !placeId) return null;

		var placeData = Places.findOne(new Meteor.Collection.ObjectID(placeId)),
			userData = Meteor.user();

 		if(userData.checkin)
 			Places.update({_id: new Meteor.Collection.ObjectID(userData.checkin) }, {
 					$pull: {checkins: this.userId}
 				});

		Places.update({_id: new Meteor.Collection.ObjectID(placeId)}, {
				$addToSet: {checkins: this.userId, hist: this.userId}
				//TODO http://stackoverflow.com/questions/21466297/slice-array-in-mongodb-after-addtoset-update
				// $addToSet: {
				// 	checkins: this.userId,
				// 	hist: { $each: [this.userId], $slice: Meteor.settings.public.maxHist }
				// }
			});
		Meteor.users.update(this.userId, {
				$set: {
					checkin: placeId,
					//loc: null,
					//loclast: placeData.loc,
					locmap: placeData.loc
				},
				$addToSet: {
					hist: placeId
				}
				//TODO
				// $addToSet: {
				// 	hist: { $each: [placeId], $slice: Meteor.settings.public.maxHist }
				// }
			});
		
		console.log('addCheckin', userData.username, placeData.name);
	},
	removeCheckin: function(placeId) {

		if(!this.userId || !placeId) return null;

		Places.update({_id: new Meteor.Collection.ObjectID(placeId)}, {
				$pull: {
					checkins: this.userId
				}
			});
		Meteor.users.update(this.userId, {
				$set: {
					checkin: null
				}
			});
		
		console.log('removeCheckin', this.userId, placeId);
	},
	addFavorite: function(placeId) {

		if(!this.userId) return null;

		Places.update({_id: new Meteor.Collection.ObjectID(placeId)}, {$inc: {rank: 1} });
		Meteor.users.update(this.userId, {$addToSet: {favorites: placeId} });
		
		console.log('addFavorite', this.userId, placeId);
	},
	removeFavorite: function(placeId) {
		
		if(!this.userId) return null;

		Places.update({_id: new Meteor.Collection.ObjectID(placeId), rank: {$gt: 0} }, {$inc: {rank: -1} });
		Meteor.users.update(this.userId, {$pull: {favorites: placeId} });
		
		console.log('removeFavorite', this.userId, placeId);
	},
	uploadAvatar: function(blob) {

		if(!this.userId) return null;

		var imagemagick = Npm.require('imagemagick'),
			fs = Npm.require('fs');

		var name = Meteor.user().username +'_'+ Climbo.util.timeUnix(),
			filename = Climbo.util.sanitizeFilename(name),
			basedir = Meteor.settings.dirs.static+'/users/',
			fileurl = Meteor.settings.public.urls.static+'/users/'+filename+'.jpg',
			filebig = basedir + filename+'.big.jpg',
			filemin = basedir + filename+'.jpg';

		console.log('uploadAvatar: wrinting...', filebig);
		fs.writeFileSync(filebig, blob, 'binary');

		//
		//Imagemagick require: aptitude install imagemagick
		//https://github.com/sylvaingi/meteor-imagemagick#resizeoptions
		//
		console.log('uploadAvatar: resizing...');
		try {
			imagemagick.crop({
				srcPath: filebig,
				dstPath: filemin,
				width: 160,
				height: 160,
				quality: 0.8
			});
		} catch(e) {
			console.log('uploadAvatar: error ', e);
			return Climbo.i18n.errors.imageNotValid;
		}
		console.log('uploadAvatar: resized', filemin);

		Meteor.users.update(this.userId, { $set: {avatar: fileurl} });
		console.log('uploadAvatar: url ', fileurl);

		return false;
	}
});

