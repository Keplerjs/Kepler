
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

Places.before.insert(function(userId, doc) {
	doc.createdAt = K.Util.timeUnix();
	doc.userId = userId;
});
