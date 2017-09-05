
if(Meteor.isClient) {

	Meteor.startup(function() {
		// Time of inactivity to set user as away automaticly. Default 60000
		UserPresence.awayTime = 10000;
		// Set user as away when window loses focus. Defaults false
		UserPresence.awayOnWindowBlur = true;
		// Start monitor for user activity
		UserPresence.start();
	});

}
else if(Meteor.isServer) {

	Meteor.startup(function() {
		// Listen for new connections, login, logoff and application exit to manage user status and register methods to be used by client to set user status and default status
		UserPresence.start();
		// Active logs for every changes
		// Listen for changes in UserSessions and Meteor.users to set user status based on active connections
		UserPresenceMonitor.start();


		UserPresence.activeLogs();

	});
}

