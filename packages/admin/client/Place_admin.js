
Kepler.Place.include({
	//override edit plugin
	isEditable: function() {

		return K.Admin.isMe() || (this.userId ? (K.Profile.id === this.userId) : false);
	}
});
/*
Kepler.extend({
	placesById: {},
	placeById: function(id) {

		if(!K.placesById['id_'+id] && K.findPlaceById(id).fetch()[0])
		{
			K.placesById['id_'+id] = new K.Place(id);
			
			if(K.Admin.isMe()) {
				var iname = K.Util.sanitize.fileName(K.placesById['id_'+id].name);
				K.Admin.placesByName[iname || 'id_'+id] = K.placesById['id_'+id];
			}
		}
		
		return K.placesById['id_'+id] || null;
	}
});

Kepler.extend({
	usersById: {},
	userById: function(id) {
		
		if(!K.usersById['id_'+id] && K.findUserById(id).fetch()[0])
		{
			K.usersById[id] = new K.User(id);
			
			if(K.Admin.isMe()) {
				var iname = K.Util.sanitize.fileName(K.usersById['id_'+id].name);
				K.Admin.usersByName[iname || 'id_'+id] = K.usersById['id_'+id];
			}
		}
		
		return K.usersById['id_'+id] || null;
	}
});
//*/