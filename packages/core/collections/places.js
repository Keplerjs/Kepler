
Places = new Mongo.Collection('places');

if(Meteor.isServer) {
	Places._ensureIndex({"loc": "2d"});
	Places._ensureIndex({"geometry": "2dsphere"});
	Places._ensureIndex({"name": "text"});
}

// https://github.com/matb33/meteor-collection-hooks
Places.before.insert(function(userId, doc) {
	doc.userId = userId;
	doc.createdAt = K.Util.time();
	//TODO modifier.$set.modifiedAt = K.Util.time();

	if(doc.loc && doc.geometry && doc.geometry.type==='Point' && !K.Util.valid.point(doc.geometry))
		doc.geometry = K.Util.geo.point(doc.loc);
});

Places.before.update(function(userId, doc, fieldNames, modifier, opts) {
	//TODO modifier.$set.modifiedAt = K.Util.time();

	if(_.contains(fieldNames,'loc') && modifier.$set && modifier.$set.loc) {
		if(!_.contains(fieldNames,'geometry') && doc.geometry.type==='Point') {
			modifier.$set.geometry = K.Util.geo.point(modifier.$set.loc);
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
