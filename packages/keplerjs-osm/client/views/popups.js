
Template.popupCursor_osm.events({
	'click .btn-osmsearch': function(e,tmpl) {

		var icon$ = tmpl.$('.btn-osmsearch .icon');
		
		$(e.target).addClass('disabled');
		icon$.addClass('icon-loader');
		
		K.Osm.loadByLoc(tmpl.data.loc, function(data) {
			$(e.target).removeClass('disabled');
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
	keys: function() {

		var ret = [];

		_.each(this.properties.tags, function(val, key) {
						
/*			var K = key,
				keys = key.split(':');

			if(keys[0])
				K = keys[0];*/

			ret.push({
				key: key,
				url: 'http://wiki.openstreetmap.org/wiki/Key:'+key,
				val: val
			});
		});

		return ret;
	}
});
