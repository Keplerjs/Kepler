
Template.registerHelper('isAdmin', function() {
	return K.Admin.isMe();
});