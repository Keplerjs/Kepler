
Meteor.startup(function() {

	var fs = Npm.require('fs');

	if(!fs.existsSync(Meteor.settings.dirs.avatars)) {
		console.log('making avatars directory ', Meteor.settings.dirs.avatars);
		fs.mkdirSync(Meteor.settings.dirs.avatars, 0755);
	}
});