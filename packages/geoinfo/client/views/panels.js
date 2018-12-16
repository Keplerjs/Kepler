
Template.panelPlaceEdit_geoinfo_tips.events({
	'click .geoinfo-nametips .btn': function(e,tmpl) {
		
		var panel$ = $(tmpl.firstNode).parents('.panel-body'),
			input$ = panel$.find('.input-editren'),
			btn$ = panel$.find('.btn-editren'),
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
