
Template.item_conver.onRendered(function() {
	
	var convid = this.data._id;

	this.$('.conver-btn-del')
		.btsConfirmButton(i18n('btns.converdel'), function(e) {
			
			var btn$ = $(e.target),
				list$ = btn$.parents('.list-group');

			K.Conver.removeConver( convid );		
			btn$.parents('.list-group-item').remove();
		});
});

Template.item_conver.helpers({
	target: function() {

		if(this.targetType==='place')
			return K.placeById(this.targetId);

		else if(this.targetType==='user') {
			var user = K.userById(this.targetId);
			return user.isMe() ? K.userById(this.userId) : user;
		}
	},	
	tit: function() {
		var title = _.str.truncate(this.title, 30);

		if(this.lastMsg)
			title = _.str.truncate(_.str.stripTags(this.lastMsg.body), 30);
		else
			title = i18n('titles.msgpriv');

		return title || '...';
	},
	usersIds: function() {
		var exclude = [this.userId, K.Profile.id];
		
		if(this.targetType==='user')
			exclude.push(this.targetId);

		return _.last(_.difference(this.usersIds, exclude), 3);
		//return _.last(this.usersIds, 3);
	}
});
