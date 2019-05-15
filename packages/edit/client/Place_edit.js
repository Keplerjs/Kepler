
Kepler.Place.include({
	
	getOwner: function() {
		this._dep.depend();
		return this.userId ? K.userById(this.userId) : {username: ''}
	},
	
	isEditable: function() {
		return !!(this.userId ? (K.Profile.id === this.userId) : false);
	}
});