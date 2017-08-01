_.extend(Kepler.Map, {

	_initControls: function() {

		var controls = {};

		controls.zoom = new L.Control.Zoom({
			position: 'bottomright',
			zoomOutText: i18n('map_zoomout'),
			zoomInText: i18n('map_zoomin')
		});

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
