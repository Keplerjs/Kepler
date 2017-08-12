

Kepler.Place.include({
	
	isEditable: function() {

		return K.Admin.isMe() || (this.userId ? K.Profile.id === this.userId : false);
	}
});

/*
Kepler.extend({
	placesById: {},
	placeById: function(id) {
		check(id, String);
		
		if(!K.placesById[id] && K.findPlaceById(id).fetch()[0])
		{
			K.placesById[id] = new K.Place(id);
			
			if(K.Admin.isMe()) {
				var iname = K.Util.sanitize.filename(K.placesById[id].name);
				K.Admin.placesByName[iname || 'id_'+id] = K.placesById[id];
			}
		}
		
		return K.placesById[id] || null;
	}
});
Kepler.extend({
	usersById: {},
	userById: function(id) {
		check(id, String);
		
		if(!K.usersById[id] && K.findUserById(id).fetch()[0])
		{
			K.usersById[id] = new K.User(id);
			
			//TODO move to admin moduile
			if(K.Admin.isMe()) {
				var iname = K.Util.sanitize.filename(K.usersById[id].name);
				K.Admin.usersByName[iname || 'id_'+id] = K.usersById[id];
			}
		}
		
		return K.usersById[id] || null;
	}
});*/