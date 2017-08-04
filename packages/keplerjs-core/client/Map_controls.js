_.extend(Kepler.Map, {

	_initControls: function(map) {

		var controls = {};

		var zoomOpts = {
			position: 'bottomright'
		};

		if(i18n('map_zoomout'))
			zoomOpts.zoomOutText = i18n('map_zoomout');
		
		if(i18n('map_zoomin'))
			zoomOpts.zoomInText = i18n('map_zoomin');

		controls.zoom = new L.Control.Zoom(zoomOpts);

		controls.attrib = new L.Control.Attribution({
			position: 'bottomright',
			prefix: i18n('map_attrib')
		});

		controls.gps = new L.Control.Gps({
			position: 'bottomright',
			title: '',
			textErr: i18n('map_gps_error'),
			marker: new L.Marker([0,0], {
				icon: L.divIcon({className: 'marker-gps'})
			}),
			callErr: function(err) {
				console.warn(err);
			}
		})
		.on({
			'gps:disabled': function(e) {
				K.Profile.setLoc(null);
			},
			'gps:located': function(e) {

				K.Profile.setLoc([e.latlng.lat, e.latlng.lng]);

				if(K.Profile.user && K.Profile.user.icon)
					K.Profile.user.icon.animate();
			}
		})

		return controls;
	}
});
