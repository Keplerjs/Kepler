
Template.popupCursor_osm.events({
	'click .btn-osmsearch': function(e,tmpl) {

		var btn$ = $(e.target),
			icon$ = btn$.find('.icon');
		btn$.addClass('disabled');
		icon$.addClass('icon-loader');
		
		K.Osm.loadByLoc(tmpl.data.loc, function(data) {
			btn$.removeClass('disabled');
			icon$.removeClass('icon-loader');
		});
	}
});

Template.popupGeojson_osm.events({
	'click .btn-osmimport': function(e,tmpl) {
		
		var icon$ = $(e.target).find('.icon');
		$(e.target).addClass('disabled');
		icon$.addClass('icon-loader');

		var osmId = tmpl.data.id;

		K.Osm.importPlace(osmId, function(placeId) {
			$(e.target).removeClass('disabled');
			icon$.removeClass('icon-loader');
			K.Map.layers.geojson.remove(tmpl.data.layer);
		});
	}
});


Template.popupOsm.helpers({
	keys: function() {

		var ret = [];

		if(this.properties && this.properties.tags) {
			_.each(this.properties.tags, function(val, key) {
				ret.push({
					key: key,
					url: 'http://wiki.openstreetmap.org/wiki/Key:'+key,
					val: val
				});
			});
		}

		return ret;
	}
});
