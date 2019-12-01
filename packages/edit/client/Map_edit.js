
Tracker.autorun(function(comp) {

	var btnSets = K.settings.public.map.controls.addButton;

	if(K.Map.ready() && btnSets.enabled) {

		if(!K.Map.controls.addButton) {
			K.Map.controls.addButton = (function() {
				var ctrl = new L.Control({
					position: btnSets.position
				});
				ctrl.onAdd = function(map) {
						var divp = L.DomUtil.create('div','test');

						Blaze.renderWithData(Template.controlMap_edit, null, divp);
						
						L.DomEvent
							.on(divp.firstChild, 'dblclick', L.DomEvent.stop, divp.firstChild)
							.on(divp.firstChild, 'click', L.DomEvent.stop, divp.firstChild)
							.on(divp.firstChild, 'click', function(e) {

								var loc = K.Map.getCenter();

								Meteor.call('insertPlace', {loc: loc }, function(err, placeId) {

									Meteor.subscribe('placeById', placeId, function() {

										Router.go('panelPlaceEdit', {placeId: placeId});

										K.Map.addItem(K.placeById(placeId));
									});
								});

							}, divp.firstChild);

						return divp.firstChild;
					};
				return ctrl;
			}());
		}

		K.Map.map.on('zoomend', function(e) {
			
			var z = K.Map.map.getZoom();

			if( K.Profile.ready && 
				z >= K.settings.public.map.dataMinZoom &&
				z >= btnSets.minZoom )
			{

				K.Map.map.addControl(K.Map.controls.addButton);
			}
			else
				K.Map.map.removeControl(K.Map.controls.addButton);
		})
		.fire('zoomend');
		//TODO REFACT!!
	}

});