Meteor.startup(function() {

	Deps.autorun(function () {
		
		if(Meteor.userId())
		{
			//console.log('main.js autorun sub: currentUser');
			
			Meteor.subscribe('currentUser', function() {

				Climbo.profile.initProfile(function() {

				});
			});
		}
		//TODO loader gif durante loggingIn
	});
});
