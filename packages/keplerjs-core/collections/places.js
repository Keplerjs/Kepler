
Places = new Mongo.Collection('places');

//TODO limt hist size
//http://stackoverflow.com/questions/21466297/slice-array-in-mongodb-after-addtoset-update
// $addToSet: {
// 	checkins: this.userId,
// 	hist: { $each: [this.userId], $slice: Meteor.settings.public.maxHist }
// }
//TODO
// $addToSet: {
// 	hist: { $each: [placeId], $slice: Meteor.settings.public.maxHist }
// }

//doc of before.insert in https://github.com/matb33/meteor-collection-hooks
Places.before.insert(function(userId, doc) {
	doc.createdAt = K.Util.time();
	doc.userId = userId;
});
