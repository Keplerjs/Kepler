/*
	Module for notifications 
*/
Kepler.Notif = {

	_types: [
		'checkin',
		'success',
		'warning',
		'online',
		'users',
		'mes'
	],

	cleanAll: function() {
		Users.update(Meteor.userId(), {
			$set: {
				notifs: []
			}
		});
	}
};
