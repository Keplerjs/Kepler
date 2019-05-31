
Template.inputFile_upload.events({

	'change .file-upload': function(e, tmpl) {
		e.preventDefault();

		var input$ = $(e.target),
			fileObj = e.originalEvent.target.files[0],
			target = tmpl.data.target,
			params = tmpl.data.params,
			onUploaded = tmpl.data.onUploaded;

//TODO use aAlert!!!
//
		input$.parent().addClass('loading-default');
		
		input$.next('.upload-err').text('');

		K.Upload.uploadFile(target, fileObj, params, function(err, ret) {
			input$.parent().removeClass('loading-default');

			if(err) {
				input$.next('.upload-err').text(err);
				input$.val('');
			}
			else if(_.isFunction(onUploaded)) {

				onUploaded(ret);
			}
			else
				input$.next('.upload-err').text('');
		});
	}
});
