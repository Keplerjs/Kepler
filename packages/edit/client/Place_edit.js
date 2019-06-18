
Kepler.Place.include({

	geomEdited: false,
	
	getOwner: function() {
		this._dep.depend();
		return this.userId ? K.userById(this.userId) : {username: ''}
	},
	
	isEditable: function() {
		return !!(this.userId ? (K.Profile.id === this.userId) : false);
	},

	setGeometry(geoj) {
		this._dep.depend();
		
		console.log('setGeometry',geoj, this)

		this.geometry = geoj.geometry;
		
		if(this.geom) {
			this.geom.remove();
			delete this.geom;
		}
		
		this.buildGeometry();//fill this.geom
		//this.update();

		this.geomEdited = true;

		return this;
	}
});