_.extend(Kepler.Map, {

	_initControls: function(map, opts) {

		var self = this;

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
			autoCenter: false,
			marker: K.Profile.user.marker,
			style: {opacity:0,fillOpacity:0},
			position: 'bottomright',			
			title: i18n('map_gps_title'),
			textErr: '<i class="icon icon-warning"></i> '+i18n('map_gps_error')
		})
		.on({
			'gps:located': function(e) {

				var loc = [e.latlng.lat, e.latlng.lng];
				
				//TODO minShift

				K.Profile.setLoc(loc);

				K.Map.setView(loc);
			},
			'gps:disabled': function(e) {
				K.Profile.setLoc(null);
			}			
		});

		//controls.scale = L.control.scale({position:'topright'});

		return controls;
	}
});
