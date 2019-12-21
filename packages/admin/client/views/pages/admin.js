
Template.pageAdmin_admin_raw.helpers({
	rawdata: function() {
		var data = {};

		if(this.type==='user')
			data = Users.findOne(this._id);
		else if(this.type==='place')
			data = Places.findOne(this._id);

		return JSON.stringify(data,null,4);
	}
});

Template.pageAdmin_admin_raw.events({
	'shown.bs.collapse ': function(e,tmpl) {
		tmpl.$('.btn-edit').removeClass('hidden');
	},
	'hidden.bs.collapse ': function(e,tmpl) {
		tmpl.$('.btn-edit').addClass('hidden disabled');
	},
	'keyup .text-data': function(e,tmpl) {
		tmpl.$('.btn-edit').removeClass('disabled');
	},
	'click .btn-edit': function(e,tmpl) {
		var ico$ = $(e.target).find('.icon'),
			text = tmpl.$('.text-data').val();

		try {

			data = JSON.parse(text);
		}
		catch(e) {
			console.log(data)
			K.Alert.warning(i18n('error_admin_rawedit'));
			return false
		}

		if(tmpl.data.type==='place') {
			ico$.addClass('icon-loader');
			K.Admin.call('updatePlace', tmpl.data.id, data, function(res) {
				ico$.removeClass('icon-loader');
			});
		}
		/*TODO else if(tmpl.data.type==='user')
			K.Admin.updateUser(tmpl.data.id, data, function(res) {
				ico$.removeClass('icon-loader');
			});*/
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
