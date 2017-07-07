
Template.upload_InputFile.events({

	'change :file': function(e) {
		e.preventDefault();

		var input$ = $(e.target),
			fileObj = e.originalEvent.target.files[0];

		//input$.parent().addClass('loading-default');
		
		K.Upload.file(fileObj, function(err, url) {
			
			//input$.parent().removeClass('loading-default');

			if(err)
				input$.next('label').text(err)
			else {
				Users.update(Meteor.userId(), {
					$set: {
						avatar: url
					}
				});
			}
		});
	}
});