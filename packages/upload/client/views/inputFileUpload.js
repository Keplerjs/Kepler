
Template.inputFile_upload.events({

	'change .file-upload': function(e, tmpl) {
		e.preventDefault();

		var input$ = $(e.target),
			fileObj = e.originalEvent.target.files[0],
			target = tmpl.data.target,
			params = tmpl.data.params,
			callback = tmpl.data.callback;

		input$.parent().addClass('loading-default');
		
		input$.next('.upload-err').text('');

		K.Upload.uploadFile(target, fileObj, params, function(err, ret) {
			input$.parent().removeClass('loading-default');

			if(err) {
				input$.next('.upload-err').text(err);
				input$.val('');
			}
			else if(_.isFunction(callback)) {

				callback(ret);
			}
			else
				input$.next('.upload-err').text('');
		});
	}
});
