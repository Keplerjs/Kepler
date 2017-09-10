
/*
Template.navSidebar_notif.onCreated(function () {
  
});
*/
//Template.navSidebar_notif.onRendered(function() {
Template.navSidebar_notif.onCreated(function () {
	
	Tracker.autorun(function(comp) {

		if(Meteor.user()) {
			//console.log('onRendered', Meteor.user() && Meteor.user().notifs.length)
			
			setTimeout(function() {
				var c = Meteor.user().notifs && Meteor.user().notifs.length
				if(c)
					document.title = '('+c+') '+document.title;
			},100)
		}

	});
	
});