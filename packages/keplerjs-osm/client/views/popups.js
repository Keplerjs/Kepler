
Template.popupCursor_osm.events({
	'click .btn-osmsearch': function(e,tmpl) {

		var icon$ = tmpl.$('.btn-osmsearch .icon');
		
		icon$.addClass('icon-loader');
		
		K.Osm.loadByLoc(tmpl.data.loc, function(data) {
			icon$.removeClass('icon-loader');
			console.log('found', data)
		});
	}
});

Template.popupGeojson_osm.events({
	'click .btn-osmcreate': function(e,tmpl) {
		K.Osm.insertPlace(tmpl.data);
	}
});


Template.popupOsm.helpers({
	
});
