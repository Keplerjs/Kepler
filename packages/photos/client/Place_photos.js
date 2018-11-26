
Kepler.Place.include({
	
	getPhotos: function() {
		this._dep.depend();
		if(this.photos.length){

			//TODO query to photos and get urls
			return this.photos;
		}
	}
});