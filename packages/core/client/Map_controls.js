_.extend(Kepler.Map, {

	_initControls: function(map, opts) {

		var self = this,
			optsDef = K.settings.public.map,
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
				marker: K.Profile.user.marker,
				style: {opacity:0,fillOpacity:0},
				position: opts.controls.gps.position,
				title: i18n('map_gps_title'),
				textErr: '<i class="icon icon-warning"></i> '+i18n('map_gps_error'),
				callErr: function(err) {
					sAlert.error(err)
				}
			})
			.on({
				'gps:located': function(e) {

					var loc = [e.latlng.lat, e.latlng.lng];

					K.Profile.setLoc(loc);

					if(!map.getBounds().pad(-0.95).contains(loc))
						K.Map.setView(loc);

					if(!K.Profile.getOnline())
						K.Profile.setOnline(true);
				},
				'gps:disabled': function(e) {
					K.Profile.setLoc(null);
				}			
			});
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
