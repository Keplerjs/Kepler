
Template.inputFile_upload.events({

	'change :file': function(e, tmpl) {
		e.preventDefault();

		var input$ = $(e.target),
			fileObj = e.originalEvent.target.files[0],
			target = this.target,
			callback = this.callback;

		input$.parent().addClass('loading-default');

		K.Upload.uploadFile(fileObj, target, function(err, ret) {

			input$.parent().removeClass('loading-default');

			if(err)
				input$.next('label').text(err)
			else if(_.isFunction(callback)) {

				callback(ret);
			}
		});
	}
});
