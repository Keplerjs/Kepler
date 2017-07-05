
Places = new Mongo.Collection('places');

//Places.allow({
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
