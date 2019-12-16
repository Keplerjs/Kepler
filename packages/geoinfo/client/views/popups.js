

Template.tabGeoinfo.helpers({
	fields: function() {

		var self = this,
			rfields = {},
			sfields = K.Util.sets(K.settings.public.geoinfo.fields);
		
		_.extend(this, K.Geoinfo.suncalc(this.loc));
		
		_.each(sfields, function(val, f) {
			if(self[f])
				rfields[f]= self[f];
		});

		return rfields;
	}
});

//https://stackoverflow.com/questions/22147813/how-to-use-meteor-methods-inside-of-a-template-helper
Template.tabLocation_geoinfo.onCreated(function() {
	
	var self = this;

	self.showFields = {
		"loc": true,
		"near": true,
		//"com": true,
		"prov": true,
		//"reg": true,
		"naz": true
	};

	self.data = Template.currentData();

    self.geoinfo = new ReactiveVar();

    Meteor.call('findGeoinfoByLoc', self.data.loc, self.showFields, function(err, data) {

		if(err)
            console.log(err);
        else
            self.geoinfo.set(data);
	});
});

Template.tabLocation_geoinfo.helpers({
	fields: function() {
		return Template.instance().geoinfo.get();
	}
});

Template.popupCursor_geoinfo.events({
	'click .btn-geoinfo': function(e,tmpl) {

		var icon$ = $(e.target).find('.icon');
		$(e.target).addClass('disabled');
		icon$.addClass('icon-loader');

	    K.Geoinfo.loadByLoc(tmpl.data.loc, function(data) {
			$(e.target).removeClass('disabled');
			icon$.removeClass('icon-loader');
		});
	}
});

Template.popupGeojson_geoinfo.helpers({
	fields: function() {
		return Template.currentData().properties;
	}
});