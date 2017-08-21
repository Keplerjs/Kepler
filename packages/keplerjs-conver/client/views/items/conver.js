
Template.item_conver.onRendered(function() {
	
	var convid = this.data._id;

	this.$('.conver-btn-del').btsConfirmButton(function(e) {

		K.Conver.removeConver( convid );

		$(e.target).parents('.list-group-item').remove();
	});
});

Template.item_conver.helpers({
	isMine: function() {
		return 
	},
	target: function() {

		if(this.targetType==='place')
			return K.placeById(this.targetId);

		else if(this.targetType==='user') {
			var user = K.userById(this.targetId);
			if(!user) return null;
			return user.isMe() ? K.userById(this.userId) : user;
		}
	},	
	tit: function() {
		var title = _.str.truncate(this.title, 30);

		if(this.lastMsg)
			title = _.str.truncate(_.str.stripTags(this.lastMsg.body), 30);
		else
			title = i18n('title_msgpriv');

		return title || '...';
	},
	usersIds: function() {
		
		var exclude = [this.userId, K.Profile.id];

		if(this.targetType==='place')
			exclude = [];
		
		if(this.targetType==='user'){
			exclude.push(this.targetId);
		}

		var users = _.last(_.difference(this.usersIds, exclude), 3);

		return users;
	}
});
