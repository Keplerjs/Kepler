_.extend(Kepler.Map, {

	_initControls: function(map, opts) {

		var self = this,
			controls = {};

		if(i18n('map_zoomout'))
			opts.controls.zoom.zoomOutText = i18n('map_zoomout');
		
		if(i18n('map_zoomin'))
			opts.controls.zoom.zoomInText = i18n('map_zoomin');

		controls.zoom = new L.Control.Zoom(opts.controls.zoom);

		if(opts.controls.gps.enabled && L.Control.Gps) {

			controls.gps = new L.Control.Gps({
				autoActive: false,
				autoCenter: false,
				marker: K.Profile.ready && K.Profile.user.marker,
				style: {opacity:0,fillOpacity:0},
				position: opts.controls.gps.position,
				title: i18n('map_gps_title'),
				textErr: '<i class="icon icon-warning"></i> '+i18n('error_gps'),
				callErr: function(err) {
					K.Alert.error(err)
				}
			})
			.on({
				'gps:located': function(e) {

					var loc = [e.latlng.lat, e.latlng.lng],
						bboxOffset = -0.95,
						zoomOffset = 2;

					K.Profile.setLoc(loc);

					if( !map.getBounds().pad(bboxOffset).contains(loc) ||
						Math.abs(opts.showLocZoom - map.getZoom()) > zoomOffset ) {
						K.Map.showLoc(loc, function() {
							if(!K.Profile.ready)
								controls.gps.deactivate();
						});
					}

					if(!K.Profile.getOnline())
						K.Profile.setOnline(true);
				},
				'gps:disabled': function(e) {
					K.Profile.setLoc(null);
				}			
			});
		}

		if(opts.controls.switch.enabled) {

			controls.switch = (function() {
				var ctrl = new L.Control({position: opts.controls.switch.position});
				ctrl.onAdd = function(map) {
					var divp = L.DomUtil.create('div','leaflet-control-switch');

					Blaze.renderWithData(Template.controlSwitch, null, divp);
					
					L.DomEvent
						.on(divp, 'dblclick', L.DomEvent.stop, divp)
						.on(divp, 'click', L.DomEvent.stop, divp);
					return divp;
				};
				return ctrl;
			}());
		}

		if(opts.controls.scale.enabled) {
			controls.scale = L.control.scale(opts.controls.scale);
		}

		if(opts.controls.attrib.enabled) {
			controls.attrib = L.control.attribution(opts.controls.attrib);
		}

		return controls;
	}
});
