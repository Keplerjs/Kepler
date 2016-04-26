var isAdmin = function() {
	if(!Meteor.user()) return false;
	return _.contains(Meteor.settings.adminUsers, Meteor.user().username);
};

Meteor.methods({
	adminCleanPlaceHist: function(placeName) {
		
		if(!isAdmin()) return null;

		var placeData = Places.findOne({name: placeName}),
			placeId = placeData._id;

		Meteor.users.update({_id: {$in: placeData.hist }}, {$pull: {hist: placeId} });
		Places.update(placeId, {
			$set: {
				hist: []
			}
		});

		console.log('adminCleanPlaceHist', placeName);
	}
});