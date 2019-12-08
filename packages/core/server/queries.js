/**
 * apply K.queries selectors to all query
 */
Places.before.find(function(userId, selector, options) {
	_.extend(selector, K.queries.placeFind);
});

Places.before.findOne(function(userId, selector, options) {
	_.extend(selector, K.queries.placeFind);
});

//TODO apply user settings if Meteor.user() is set
//
//	or
// 
//TODO use Session.set() for apply a session filter