
Template.panelPlaceEdit_edit_map.onRendered(function() {
	
	var self = this,
		place = this.data,
		editMap$ = self.$('#editMap'),
		sets = K.settings.public.map;
	
	editMap$
	.on('hidden.bs.collapse', function(e) {
		if(self.editMap) {
			self.editMap.remove();
			delete self.editMap;
			delete self.newloc;
		}
	})
	.on('shown.bs.collapse', function(e) {
		if(!self.editMap) {

			var layerName = K.Profile.getOpts('map.layer') || K.settings.public.map.layer,
				layer = L.tileLayer(sets.layers[layerName]);

			var icon = new L.NodeIcon(),
				marker = L.marker(place.loc, {icon: icon});

			self.editMap = L.map($(e.target).find('.map')[0], {
				attributionControl:false,
				scrollWheelZoom:false,
				doubleClickZoom:false,
				zoomControl:false,
				layers: layer,
				center: place.loc,
				zoom: 16
			})
			.on('move zoomstart', function(e) {

				var loc = self.editMap.getCenter(),
					newloc = K.Util.geo.locRound([loc.lat, loc.lng]);

				marker.setLatLng(newloc);

				self.$('.input-editloc').val(newloc.join(','))
			});

			L.control.zoom({
				position: 'bottomright',
				zoomOutText: i18n('map_zoomout'),
				zoomInText: i18n('map_zoomin'),
			}).addTo(self.editMap);

//EDIT LEFLET DRAW
			if(sets.controls.draw.enabled) {
				let conf = _.deepExtend({}, sets.controls.draw, {
					polyline: {
						shapeOptions: sets.styles.geometry
					},
					polygon: {
						shapeOptions: sets.styles.geometry
					}
				});

				conf.position = 'bottomright';
				
				if(place.geom) {
					conf.edit.featureGroup = L.geoJson(place.geometry, {
						style: function (f) {
							return f.style || sets.styles.geometry;
						}
					});
				
					let ll = L.latLng(place.loc),
						bb = place.geom.getBounds().extend(ll),
						z = self.editMap.getBoundsZoom(bb);
					self.editMap.setZoom(z-1);
				}
				else
					conf.edit.featureGroup = L.geoJson();

				conf.edit.featureGroup.addTo(self.editMap);

				self.drawControl = new L.Control.Draw(conf);
				self.drawControl.addTo(self.editMap);
				self.editMap
				.on('draw:drawstart', function(e) {
					//TODO backup old geom and geometry
					//self._geom = self.geom;
					conf.edit.featureGroup.clearLayers();
				})
				.on('draw:created', function (e) {
					var type = e.layerType,
						layer = e.layer,
						geoj = layer.toGeoJSON();
					
					//console.log('draw:created', geoj);

					//setTimeout(function() {
					conf.edit.featureGroup.addData(geoj);
					//},100);

					place.setGeometry(geoj.geometry);
					//place.showGeometry();
					place.geomEdited = true;
				})
				.on('draw:edited', function (e) {
					var type = e.layerType,
						layer = e.layers,
						geoj = layer.toGeoJSON().features.pop();
					
					//console.log('draw:edited', geoj);

					//setTimeout(function() {
					conf.edit.featureGroup.clearLayers();
					conf.edit.featureGroup.addData(geoj);
					//},100);

					place.setGeometry(geoj.geometry);
					//place.showGeometry();
					place.geomEdited = true;
				});			
			}

			marker.addTo(self.editMap);
			
			Blaze.renderWithData(Template.markerPlace, self, icon.nodeHtml);
		}
	});
});


Template.panelPlaceEdit_edit_map.events({
	/* //TODO	'keyup .input-editloc': _.debounce(function(e, tmpl) {
		e.preventDefault();
	}, 300),*/
	'click .btn-saveloc': function(e,tmpl) {
		
		var place = tmpl.data,
			newData = {
				loc: K.Util.geo.locRound( tmpl.$('.input-editloc').val().split(',') )
			};
		
		if(place.geomEdited) {
			newData.geometry = place.geometry;
		}

		Meteor.call('updatePlace', place.id, newData, function(err) {
			
			tmpl.$('.collapse').collapse('hide');

			place.update();
			
			if(place.geomEdited) {
				place.geomEdited = false;
				place.showGeometry();
			}
		});
	},
	'click .btn-cancloc': function(e,tmpl) {
		tmpl.$('.collapse').trigger('hidden.bs.collapse');
		tmpl.$('.collapse').trigger('shown.bs.collapse');
		tmpl.$('.input-editloc').val( K.Util.geo.locRound(tmpl.data.loc) )
		//TODO decide beahvior tmpl.$('.collapse').collapse('hide');
	},
});