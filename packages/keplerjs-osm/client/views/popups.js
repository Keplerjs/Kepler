
Template.popupCursor_osm.events({
	'click .btn-osmsearch': function(e,tmpl) {

		var icon$ = $(e.target).find('.icon');
		$(e.target).addClass('disabled');
		icon$.addClass('icon-loader');
		
		K.Osm.loadByLoc(tmpl.data.loc, function(data) {
			$(e.target).removeClass('disabled');
			icon$.removeClass('icon-loader');
		});
	}
});

Template.popupGeojson_osm.events({
	'click .btn-osmimport': function(e,tmpl) {
		
		var icon$ = $(e.target).find('.icon');
		$(e.target).addClass('disabled');
		icon$.addClass('icon-loader');

		K.Osm.importPlace(tmpl.data, function(placeId) {
			$(e.target).removeClass('disabled');
			icon$.removeClass('icon-loader');
		});
	}
});


Template.popupOsm.helpers({
	keys: function() {

		var ret = [];

		_.each(this.properties.tags, function(val, key) {
			ret.push({
				key: key,
				url: 'http://wiki.openstreetmap.org/wiki/Key:'+key,
				val: val
			});
		});

		return ret;
	}
});
