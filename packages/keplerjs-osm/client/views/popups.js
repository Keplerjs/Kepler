
Template.popupCursor_osm.events({
	'click .btn-osmsearch': function(e,tmpl) {
		K.Osm.loadByLoc(this.loc);
	}
});

Template.popupGeojson_osm.events({
	'click .btn-osmcreate': function(e,tmpl) {
		K.Osm.insertPlace(tmpl.data);
	}
});
