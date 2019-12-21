
Template.panelPlaceEdit_osm_reload.events({
	'click .btn-reload': function(e,tmpl) {
		Meteor.call('updatePlaceByOsmId', tmpl.data.id, function(err) {
			tmpl.data.update();
		});
	}
});
