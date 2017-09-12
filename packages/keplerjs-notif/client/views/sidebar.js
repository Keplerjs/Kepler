
//Template.navSidebar_notif.onRendered(function() {
Template.navSidebar_notif.onCreated(function () {
	
	Tracker.autorun(function(comp) {

		if(Meteor.user()) {

			var count = Meteor.user().notifs && Meteor.user().notifs.length;

			if(count) {
				Meteor.setTimeout(function() {
				
				var title = document.getElementsByTagName('title')[0],
					reg = /^\(\d*\+?\) /;

				if(count>0) {
					if(reg.exec(title.text))
						title.text = title.text.replace(reg,'('+count+') ');
					else
						title.text = '('+count+') '+title.text;
				}
				else
					title.text = title.text.replace(reg,'');

				},200);	//after Router.onAfterAction
			}
		}

	});
	
});