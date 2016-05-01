
getPlacesByCheckins = function(usersIds) {
	usersIds = _.isArray(usersIds) ? {$in: usersIds} : usersIds;
	
	return Places.find({checkins: usersIds }, { fields: Climbo.perms.placeItem });
};

getPlaceById = function(placeId) {
	return Places.find({_id: new Meteor.Collection.ObjectID(placeId) }, { fields: Climbo.perms.placePanel });
};

