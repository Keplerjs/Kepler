
Template.pageAdmin_admin_raw.helpers({
	rawdata: function() {
		if(this.type==='user')
			return Users.findOne(this._id);
		else if(this.type==='place')
			return Places.findOne(this._id);
	}
});

Template.pageAdmin_admin_map.onRendered(function() {
	var loc = this.data.loc,
		sets = K.settings.public.map,
		layer = L.tileLayer(sets.layers[sets.layer]);

	var map = L.map(this.find('.minimap'), {
		attributionControl:false,
		zoomControl:false,
		layers: layer,
		center: loc,
		zoom: 12
	});

	var icon = new L.NodeIcon(),
		marker = L.marker(loc, {icon: icon});

	marker.addTo(map);
	Blaze.renderWithData(Template.markerPlace, this, icon.nodeHtml);
});