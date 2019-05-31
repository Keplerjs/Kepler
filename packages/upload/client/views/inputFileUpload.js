
Template.inputFile_upload.events({

	'change .file-upload': function(e, tmpl) {
		e.preventDefault();

		var input$ = tmpl.$('.file-upload'),
			fileObj = input$[0].files[0],
			target = tmpl.data.target,
			params = tmpl.data.params,
			onSelect = tmpl.data.onSelect;

		if(_.isFunction(onSelect)) {

			onSelect(target, fileObj, params);
		}
	},
	
	'click .btn-upload': function(e, tmpl) {
		e.preventDefault();

		var input$ = tmpl.$('.file-upload'),
			fileObj = input$[0].files[0],
			target = tmpl.data.target,
			params = tmpl.data.params,
			onUploaded = tmpl.data.onUploaded;

		input$.parent().addClass('loading-bar');
		
		K.Upload.uploadFile(target, fileObj, params, function(err, ret) {

			input$.parent().removeClass('loading-bar');

			if(err) {
				input$.val('');
				K.Alert.error(err);
			}
			else if(_.isFunction(onUploaded)) {

				onUploaded(ret);
			}
		});
	}
});
