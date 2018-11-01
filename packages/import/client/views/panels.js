
Template.inputFileImport.events({
	
	'change #fileimport': function(e) {
		e.preventDefault();

		var input$ = $(e.target),
			fileObj = e.originalEvent.target.files[0];

		input$.parent().addClass('loading-default');
		
		K.Import.importFile(fileObj, function(err, ret) {

			input$.parent().removeClass('loading-default');

			if(err)
				input$.next().text(err)
			else {
				//DEBUG K.Map.addGeojson(ret)
				input$.next().text( ret.length+' '+i18n('label_imported') )
			}
		});
	}
});


Template.popupImport.helpers({
	keys: function() {

		var ret = [];

		_.each(this.properties, function(val, key) {
			ret.push({
				key: key,
				val: val
			});
		});

		return ret;
	}
});
