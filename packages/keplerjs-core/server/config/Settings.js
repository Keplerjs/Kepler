
//TODO move to prestart.sh and run in package.json scripts prestart

Meteor.startup(function() {

	var fs = Npm.require('fs');

	if(!fs.existsSync(Meteor.settings.dirs.avatars)) {
		console.log('making avatars directory ', Meteor.settings.dirs.avatars);
		fs.mkdirSync(Meteor.settings.dirs.avatars, 0755);
	}
});


/*TODO
if(Meteor.isServer)
	Settings = _.extend(JSON.parse(Assets.getText('settings.default.json')), Meteor.settings);

else if(Meteor.isClient)
	Settings = Meteor.settings.public;
*/
