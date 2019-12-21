
Template.panelPlaceEdit_edit_map.onRendered(function() {
	
	var self = this,
		place = this.data,
		editMap$ = self.$('#editMap'),
		editSave$ = self.$('.btn-editsave'),
		editCanc$ = self.$('.btn-editcanc'),
		loc$ = self.$('.input-editloc'),		
		sets = K.settings.public.map;

	editMap$
	.on('hidden.bs.collapse', function(e) {
		if(self.editMap) {
			loc$.prop('readonly', true);
			self.editMap.remove();
			delete self.editMap;
			delete self.newloc;
		}
	})
	.on('shown.bs.collapse', function(e) {
		if(!self.editMap) {

			loc$.prop('readonly', false);

			var layerNameDef = K.settings.public.map.layer,
				layerName = K.Profile.getOpts('map.layer') || layerNameDef,
				layerUrl = sets.layers[layerName] || sets.layers[layerNameDef],
				layer = L.tileLayer(layerUrl, {
					maxZoom: 20,
    				maxNativeZoom: 18
				});

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

				if(!self.geomEditing) {
					marker.setLatLng(newloc);

					loc$.val(newloc.join(','))
				}
			})
			.addControl(L.control.zoom({
				position: 'bottomright',
				zoomOutText: i18n('map_zoomout'),
				zoomInText: i18n('map_zoomin'),
			}))
			.addControl(L.control.fullscreen({
				position: 'bottomright'
			}))
			.on('fullscreenchange', function(e) {
				
				if(this.isFullscreen())
					this.scrollWheelZoom.enable()
				else
					this.scrollWheelZoom.disable()
			});

			marker.addTo(self.editMap);
			
			Blaze.renderWithData(Template.markerPlace, self, icon.nodeHtml);

			
			if(sets.controls.draw.enabled) {

				let conf = sets.controls.draw;

				_.each(sets.controls.draw, function(c, k) {
					if(c)
						c.shapeOptions = sets.styles.geometry;
				});

				conf.position = 'topright';
				
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
				
				if(place.geometry && place.geometry.type.startsWith('Multi')) {
					editMap$.before(
						'<div class="alert alert-warning">'+
						i18n('error_edit_notMultigeom')+'<div>');
					return;
				}

				self.drawControl = new L.Control.Draw(conf);
				self.drawControl.addTo(self.editMap);
				self.editMap
				.on('draw:editstart', function(e) {
					self.geomEditing = true;
				})
				.on('draw:editstop', function(e) {
					self.geomEditing = false;
				})
				.on('draw:drawstart', function(e) {
					conf.edit.featureGroup.clearLayers();
				})
				.on('draw:created', function (e) {
					var type = e.layerType,
						layer = e.layer,
						geoj = layer.toGeoJSON();

					conf.edit.featureGroup.addData(geoj);
					place.setGeometry(geoj.geometry);
					place.geomEdited = true;
				})
				.on('draw:edited', function (e) {
					var type = e.layerType,
						layer = e.layers,
						geoj = layer.toGeoJSON(),
						feature = geoj.features.pop();

					if(feature) {
						conf.edit.featureGroup.clearLayers();
						conf.edit.featureGroup.addData(feature);
						place.setGeometry(feature.geometry);
					}
					place.geomEdited = true;

					editSave$.trigger('click');
				});			
			}
		}
	});
});


Template.panelPlaceEdit_edit_map.events({
	'hidden.bs.collapse': function(e,tmpl) {
		tmpl.$('.btn-editsave, .btn-editcanc').addClass('hidden')
	},
	'shown.bs.collapse': function(e,tmpl) {
		tmpl.$('.btn-editsave, .btn-editcanc').removeClass('hidden')
	},	
	'change .input-editloc, keyup .input-editloc': _.debounce(function(e, tmpl) {
		var oldloc = tmpl.data.loc,
			loc$ = $(e.target),
			loc = K.Util.geo.locParseString(loc$.val());

		if(K.Util.valid.loc(loc)) {
			tmpl.editMap.panTo(loc, {animate:false});
			loc$.val( K.Util.humanize.loc(loc) )
		}
		else
			loc$.val(oldloc)

	}, 500),
	'click .place-btn-map': function(e, tmpl) {
		e.preventDefault();
		this.showLoc();
	},
	'click .btn-editsave': function(e,tmpl) {
		
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
	'click .btn-editcanc': function(e,tmpl) {
		tmpl.$('.collapse').trigger('hidden.bs.collapse');
		tmpl.$('.collapse').trigger('shown.bs.collapse');
		tmpl.$('.input-editloc').val( tmpl.data.loc )
		//TODO decide beahvior tmpl.$('.collapse').collapse('hide');
	},
});