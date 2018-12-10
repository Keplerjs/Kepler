
/*Template.panelPlaceEdit_geoinfo.onRendered(function() {
	
	var panel$ = $(this.firstNode).parents('.panel-body'),
		input$ = panel$.find('.input-editren'),
		near = K.Util.getPath(this.data,'geoinfo.near');

	if(input$.val()==='' && near!=='')
		input$.val(near);
});

*/
Template.panelPlaceEdit_geoinfo.events({
	'click .geoinfo-nametips .btn': function(e,tmpl) {
		
		var panel$ = $(tmpl.firstNode).parents('.panel-body'),
			input$ = panel$.find('.input-editren'),
			name = $(e.target).text();

		input$.val(name);
	}
});
