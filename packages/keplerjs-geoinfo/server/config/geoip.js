
/*Accounts.onLogin(function(login) {

	var ip = login.connection.httpHeaders['x-real-ip'] || login.connection.clientAddress;

	if(Meteor.settings.geoipLocation && !K.Util.getPath(login.user,'settings.map.center') )
		Users.update(login.user._id, {
			$set: {
				'settings.map.center': K.Geoinfo.geoip(ip)
			}
		});
});*/
