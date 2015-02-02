
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

				if(!Climbo.profile.initialized)
				{
					Climbo.profile.initProfile();
				
					// if(!Climbo.map.initialized)	//da eseguire dopo il rende di template map
					// 	Climbo.map.initMap(Meteor.settings.public.map, function(map) {
					// 		Climbo.map.enableBBox();	//abilita caricamento markers
					// 	});

			//DEBUGGING:
					if(Meteor.Device.isDesktop())
					setTimeout(function() {
						//Climbo.map.loadPanelPlace('50223dc356d80c330e00000a');
						Climbo.map.loadPanelFriends();
						Climbo.map.loadPanelProfile();
						//Climbo.map.loadPanelUser('pn5FqCGT6ACXLfRW8');
						//Climbo.convers.show('GkeopcPuQ9XdL9mhj');
					},1000);
					
					// var mm = [
					// 	['Ci sono <b>6</b> climbers a <a href="#">Configni</a>.','users'],
					// 	['Nuova conversazione sulla bacheca di <a href="#">Monte soratte</a>','mes'],
					// 	['<a href="#">Iphone</a> &egrave; online!','online'],
					// 	['<a href="#">Giulia</a> si sta spostando <a href="#">qui!</a>','map-user'],
					// 	['<a href="#">Iphone</a> &egrave; arrivato a <a href="#" href="#">Vitorchiano</a>!','checkin'],
					// 	['GPS disabilitato!','warn']
					// ];
					// (function a() {
					// 	var i = _.random(1,mm.length)-1;
					// 	Climbo.alerts.show(mm[i][0],mm[i][1]);
					// 	setTimeout(a,_.random(3000,9000));
					// })();
				}
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
