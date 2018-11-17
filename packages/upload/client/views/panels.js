
Template.panelSettings_upload.events({
	
	'change #fileavatar': function(e) {
		e.preventDefault();

		var input$ = $(e.target),
			fileObj = e.originalEvent.target.files[0],
			target = 'avatars';

		input$.parent().addClass('loading-default');
		
		K.Upload.uploadFile(fileObj, target, function(err, url) {

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

Template.panelSettings_upload.helpers({
	updateAvatar: function() {
		return K.Upload.updateAvatar;
	}
});