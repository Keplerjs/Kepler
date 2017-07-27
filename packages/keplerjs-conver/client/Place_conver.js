
Kepler.Place.include({
	
	conversCount: function() {
		this._dep.depend();
		return this.convers && this.convers.length;
	}
});