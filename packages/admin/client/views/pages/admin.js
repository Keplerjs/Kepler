
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
		loc = self.data.loc,
		sets = K.settings.public.map,
		layer = L.tileLayer(sets.layers[sets.layer]);

	var map = L.map(self.find('.minimap'), {
		attributionControl:false,
		zoomControl:false,
		layers: layer,
		center: loc,
		zoom: 12
	})
	.whenReady(function() {

		var icon = new L.NodeIcon(),
		marker = L.marker(loc, {icon: icon});

		if(self.data.geometry && self.data.geometry.type!=='Point')
			L.geoJson(self.data.geometry).addTo(this);

		marker.addTo(this);
		
		Blaze.renderWithData(Template.markerPlace, self, icon.nodeHtml);
	})

	
});

Template.pageAdmin_admin_owner.onRendered(function() {

	var self = this,
		placeId = self.data.id,
		input$ = self.$('.input-owner');

	// https://github.com/twitter/typeahead.js
	input$.typeahead({
		limit: 30,
		minLength: 1,
		highlight: true
	},
	{
		name: 'users',
		display: 'username',
    	suggestion: '<a class="btn user-btn-name">{{value}}</a>',		
		source: _.debounce(function(text, sync, cb) {
			
			if(!text.length) return [];

			Meteor.subscribe('usersByName', text, function() {
			
				var users = K.findUsersByName(text).fetch();
				/*var users = _.map(K.findUsersByName(text).fetch(), function(u) {
					return K.userById(u._id)
				});*/

				cb(users);
			});

		}, 300)
	})
	.on('typeahead:select', function(e) {
		K.Admin.updatePlaceOwner(placeId, e.target.value);
		self.data.update();
	});
});