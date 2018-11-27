
Kepler.Place.include({
	
	isEditable: function() {
		return !!(this.userId ? (K.Profile.id === this.userId) : false);
	}
});