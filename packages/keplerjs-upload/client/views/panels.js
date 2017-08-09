
Template.panelSettings_upload.events({
	
	'change #fileavatar': function(e) {
		e.preventDefault();

		if(!K.Upload) return false;

		var input$ = $(e.target),
			fileObj = e.originalEvent.target.files[0],
			target = 'avatars';

		input$.parent().addClass('loading-default');
		
		K.Upload.uploadFile(fileObj, target, function(err, url) {
			console.log(err,url)
			input$.parent().removeClass('loading-default');

			if(err)
				input$.next().text(err)
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