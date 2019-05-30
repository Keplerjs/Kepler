
Places = new Mongo.Collection('places');

if(Meteor.isServer) {
	Places._ensureIndex({"loc": "2d"});
	Places._ensureIndex({"name": "text"});
}

// https://github.com/matb33/meteor-collection-hooks
Places.before.insert(function(userId, doc) {
	doc.createdAt = K.Util.time();
	//TODO modifier.$set.modifiedAt = K.Util.time();
	
	doc.userId = userId;
	doc.geometry = K.Util.geo.point([doc.loc[1],doc.loc[0]]);
});

Places.before.update(function(userId, doc, fieldNames, modifier, options) {
	//TODO modifier.$set.modifiedAt = K.Util.time();
	
	if(_.contains(fieldNames,'loc') && modifier.$set) {
		if(!doc.geometry || (doc.geometry && doc.geometry.type==='Point')) {
			modifier.$set.geometry = K.Util.geo.point(doc.loc);
		}
	}
	
});

Places.after.remove(function(userId, doc) {
	if(doc.checkins.length) {
		Users.update({
			$or: [
				{checkin: doc._id },
				{hist: doc._id },
				//TODO limiti hist length
				////https://stackoverflow.com/questions/21466297/slice-array-in-mongodb-after-addtoset-update
			]
		}, {
			$set: {
				checkin: null
			},
			$pull: {
				hist: doc._id
			}
		});
	}
});

//TODO limt hist size
//http://stackoverflow.com/questions/21466297/slice-array-in-mongodb-after-addtoset-update
// $addToSet: {
// 	checkins: this.userId,
// 	hist: { $each: [this.userId], $slice: 5t }
// }
//TODO
// $addToSet: {
// 	hist: { $each: [placeId], $slice: 5 }
// }
