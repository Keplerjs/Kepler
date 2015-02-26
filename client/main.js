
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

					// 	Climbo.map.initMap(Meteor.settings.public.map, function(map) {
					// 		Climbo.map.enableBBox();	//abilita caricamento markers
					// 	});

			//DEBUGGING:
					if(Meteor.Device.isDesktop())
					setTimeout(function() {
						//Climbo.map.loadPanelPlace('50223dc356d80c330e00000a');
						if(Climbo.map.initilized){
							Climbo.map.loadPanelFriends();
							Climbo.map.loadPanelProfile();
						}
						//Climbo.map.loadPanelUser('pn5FqCGT6ACXLfRW8');
						//Climbo.convers.show('GkeopcPuQ9XdL9mhj');
					},1000);
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
