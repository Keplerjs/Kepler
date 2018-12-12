
Template.panelPlaceEdit_geoinfo_tips.events({
	'click .geoinfo-nametips .btn': function(e,tmpl) {
		
		var panel$ = $(tmpl.firstNode).parents('.panel-body'),
			input$ = panel$.find('.input-editren'),
			name = $(e.target).text();

		input$.val(name);
	}
});

Template.panelPlaceEdit_geoinfo_reload.events({
	'click .btn-reload': function(e,tmpl) {
		Meteor.call('updatePlaceGeoinfo', tmpl.data.id);
	},
/*	'click .btn-canc': function(e,tmpl) {
		
		Meteor.call('', tmpl.data.id);
	}*/
});
