
Template.popupCursor_osm.events({
	'click .btn-osmsearch': function(e,tmpl) {
		K.Osm.loadQuery(this.loc);
		K.Map.cursor.hide();
	}
});

Template.popupGeojson_osm.events({
	'click .btn-osmcreate': function(e,tmpl) {
		console.log('create place', this)
	}
});
