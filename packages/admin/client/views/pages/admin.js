
Template.pageAdmin_admin_raw.helpers({
	rawdata: function() {
		if(this.type==='user')
			return Users.findOne(this._id);
		else if(this.type==='place')
			return Places.findOne(this._id);
	}
});

Template.pageAdmin_admin_map.onRendered(function() {
	var self = this,
		mapDiv = self.find('.minimap'),
		loc = self.data.loc,
		sets = K.settings.public.map,
		layer = L.tileLayer(sets.layers[sets.layer]);
	
	if(!mapDiv)
		return false;

	var map = L.map(mapDiv, {
		attributionControl:false,
		zoomControl:false,
		layers: layer,
		center: loc,
		zoom: 12
	})
	.whenReady(function() {

		var icon = new L.NodeIcon(),
		marker = L.marker(loc, {icon: icon});

		if(self.data.geometry && self.data.geometry.type!=='Point') {
			let geo = L.geoJson(self.data.geometry).addTo(this);
			this.fitBounds(geo.getBounds())
		}

		marker.addTo(this);
		
		Blaze.renderWithData(Template.markerPlace, self, icon.nodeHtml);
	});	
});
