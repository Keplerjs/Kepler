

Template.popupGeoinfo.helpers({
	fields: function() {

		var ret = {},
			suncalc = K.Geoinfo.suncalc(this.loc),
			fields = _.extend({}, this, suncalc);

		_.each(fields, function(val, field) {
			if(K.settings.public.geoinfo.fields[field])
				ret[field]= val;
		});
		return ret;
	}
});

//https://stackoverflow.com/questions/22147813/how-to-use-meteor-methods-inside-of-a-template-helper
Template.popupCursor_geoinfo.onCreated(function() {
	
	var self = this;

	self.showFields = {
		"loc": true,
		"ele": true,
		//"esp": true,
		"near": true
	};

	self.cursorData = Template.currentData();

    self.geoinfo = new ReactiveVar();

    Meteor.call('findGeoinfoByLoc', self.cursorData.loc, self.showFields, function(err, data) {

		if(err)
            console.log(err);
        else
            self.geoinfo.set(data);
	});
});

Template.popupCursor_geoinfo.helpers({
	fields: function() {
		return Template.instance().geoinfo.get();
	}
});