
Kepler.Place.include({
	
	isEditable: function() {
		return K.Admin.isMe() || (this.userId ? K.Profile.id === this.userId : false);
	}
});