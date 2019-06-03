
Template.inputFile_upload.events({

	'change .file-upload': function(e, tmpl) {
		e.preventDefault();

		var input$ = tmpl.$('.file-upload'),
			fileObj = input$[0].files[0],
			target = tmpl.data.target,
			params = tmpl.data.params,
			onSelect = tmpl.data.onSelect;

		input$.parent('.inputFile_upload').addClass('selected');

		K.Upload.loadFile(target, fileObj, params, function(err, fileObj, params) {

			if(err) {	
				K.Alert.error(err);
			}
			else if(_.isFunction(onSelect)) {

				onSelect(err, fileObj, params);
			}
		});
	},
	
	'click .btn-upload': function(e, tmpl) {
		e.preventDefault();

		var input$ = tmpl.$('.file-upload'),
			fileObj = input$[0].files[0],
			target = tmpl.data.target,
			params = tmpl.data.params,
			onUploaded = tmpl.data.onUploaded;

		input$.parent('.inputFile_upload').removeClass('selected').addClass('loading-bar');
		
		K.Upload.uploadFile(target, fileObj, params, function(err, ret) {

			input$.parent('.inputFile_upload').removeClass('loading-bar');
			input$.val('');

			if(err) {	
				K.Alert.error(err);
			}
			else if(_.isFunction(onUploaded)) {

				onUploaded(ret, fileObj, params);
			}
		});
	}
});
