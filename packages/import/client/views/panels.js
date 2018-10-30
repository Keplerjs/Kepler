

Template.panelProfile_import.helpers({
	imports: function() {
		return K.Import.imports;
	}
});

Template.panelImport.helpers({
	imports: function() {
		return K.Import.imports;
	}
});


Template.panelImport.events({
	
	'change #fileimport': function(e) {
		e.preventDefault();

		var input$ = $(e.target),
			fileObj = e.originalEvent.target.files[0],
			target = 'avatars';

		input$.parent().addClass('loading-default');
		
		K.Import.importFile(fileObj, target, function(err, url) {

			input$.parent().removeClass('loading-default');

			if(err)
				input$.next().text(err)
			else {
				console.log(url)
			}
		});
	}
});