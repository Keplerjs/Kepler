
Template.pageAdmin_admin_raw.helpers({
	rawdata: function() {
		if(this.type==='user')
			return Users.findOne(this._id);
		else if(this.type==='place')
			return Places.findOne(this._id);
	}
});

Template.pageAdmin_admin_map.onDestroyed(function() {
	if(this.minimap)
		this.minimap.remove();
});

Template.pageAdmin_admin_map.onRendered(function() {

	var self = this,
		loc = self.data.loc,
		geom = self.data.geometry,
		sets = K.settings.public.map;

	if(loc)
	this.minimap = L.map(self.find('.minimap'), {
		attributionControl:false,
		scrollWheelZoom:false,
		zoomControl:false,
		layers: L.tileLayer(sets.layers[sets.layer]),
		center: loc,
		zoom: 12
	})
	.whenReady(function() {
		
		this.setView(loc);

		var icon = new L.NodeIcon(),
			marker = L.marker(self.data.loc, {icon: icon}).addTo(this);

		if(geom && geom.type!=='Point' && geom.coordinates) {
			let geo = L.geoJson(geom).addTo(this);
			this.fitBounds( geo.getBounds() ,{animate:false});
		}
		
		Blaze.renderWithData(Template.markerPlace, self.data, icon.nodeHtml);
	});	
});
