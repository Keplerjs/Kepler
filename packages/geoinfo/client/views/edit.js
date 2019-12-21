
Template.panelPlaceEdit_geoinfo_tips.onCreated(function() {
	
	var self = this;

	self.data = Template.currentData();

	self.geotips = new ReactiveVar([]);
	
	Meteor.call('findReverseGeo', self.data.loc, function(err, res) {
		self.geotips.set(res);
	}); 
});

Template.panelPlaceEdit_geoinfo_tips.helpers({
	geotips: function() {
		return Template.instance().geotips.get();
	}
});

Template.panelPlaceEdit_geoinfo_tips.events({
	'click .geoinfo-nametips .btn': function(e,tmpl) {
		
		var panel$ = $(tmpl.firstNode).parents('.panel-body'),
			input$ = panel$.find('.input-name'),
			btn$ = panel$.find('.btn-rename'),
			name = $(e.target).text();

		input$.val(name);
		btn$.trigger('click');
	}
});

Template.panelPlaceEdit_geoinfo_reload.events({
	'click .btn-reload': function(e,tmpl) {
		Meteor.call('updatePlaceGeoinfo', tmpl.data.id, function(err) {
			tmpl.data.update();
		});
	},
/*	'click .btn-canc': function(e,tmpl) {
		
		Meteor.call('', tmpl.data.id);
	}*/
});
