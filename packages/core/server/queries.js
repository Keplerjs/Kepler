/**
 * apply K.queries selectors to all query
 */
Places.before.find(function(userId, selector, options) {
	_.deepExtend(selector, K.queries.placeFind.selector);
	_.deepExtend(options, K.queries.placeFind.options);
});

Places.before.findOne(function(userId, selector, options) {
	_.deepExtend(selector, K.queries.placeFind.selector);
	_.deepExtend(options, K.queries.placeFind.options);
});

//TODO apply user settings if Meteor.user() is set
//
//	or
// 
//TODO use Session.set() for apply a session filter