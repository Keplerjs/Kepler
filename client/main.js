/*Meteor.startup(function() {

	Deps.autorun(function () {

console.log('startup', Meteor.userId())		

			
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
*/