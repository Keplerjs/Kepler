_.extend(Kepler.Map, {

	_initControls: function(map, opts) {

		var controls = {};

		var zOpts = {
			position: 'bottomright'
		};

		if(i18n('map_zoomout'))
			zOpts.zoomOutText = i18n('map_zoomout');
		
		if(i18n('map_zoomin'))
			zOpts.zoomInText = i18n('map_zoomin');

		controls.zoom = new L.Control.Zoom(zOpts);

		if(L.Control.Gps)
		controls.gps = new L.Control.Gps({
			autoActive: false,
			autoCenter: true,
			marker: K.Profile.user.marker,
			style: {opacity:0,fillOpacity:0},
			position: 'bottomright',
			title: i18n('map_gps_title'),
			textErr: i18n('map_gps_error'),
			callErr: function(err) {
				console.warn(err);
			}
		})
		.on({
			'gps:located': function(e) {
				K.Profile.setLoc([e.latlng.lat, e.latlng.lng]);
			},
			'gps:disabled': function(e) {
				K.Profile.setLoc(null);
			}			
		});

		return controls;
	}
});
