
//global reactive sources
Session.set('panelPlaceId', null);
Session.set('panelUserId', null);
Session.set('dialogConverId', null);
Session.set('dialogShareId', null);


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

	//TODO
	// $(window).on('onbeforeunload', function (event) {
	// 	var message = 'Sure you want to leave?';
	// 	if (typeof event == 'undefined') {
	// 	event = window.event;
	// 	}
	// 	if (event) {
	// 	event.returnValue = message;
	// 	}
	// 	return message;
	// }	
});
