
Kepler.Place.include({

	getOwner: function() {
		this._dep.depend();
		return this.userId ? K.userById(this.userId) : {username: ''}
	},
	
	isEditable: function() {
		return !!(this.userId ? (K.Profile.id === this.userId) : false);
	},

	setGeometry(geo) {

		this._dep.depend();

		this.geometry = geo;
		
		if(this.geom) {
			//this.geom.removeFrom(K.Map.layers.geometries);
			this.geom.remove();
			//K.Map.layers.geometries.removeLayer(this.geom);
			delete this.geom;//force rebuild dont remove
			this.buildGeometry();//fill this.geom
		}
		
		//this.update();

		return this;
	}
});