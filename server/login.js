
Accounts.onLogin(function(login) {

	if(!login.user.locmap) {
	
		var ip = login.connection.clientAddress!='127.0.0.1' ? login.connection.clientAddress : login.connection.httpHeaders['x-real-ip'],
			geoip = Climbo.geodata.geoip(ip);

		Meteor.users.update(login.user._id, {$set: {locmap: geoip.loc }});
	}
	console.log('Login:',login.user.username);
});

Accounts.onLoginFailure(function() {
	console.log('LoginFailure:',arguments);
});