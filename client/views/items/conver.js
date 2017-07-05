
Template.item_conver.onRendered(function() {
	
	var convid = this.data._id;

	this.$('.conver-btn-del')
		.btsConfirmButton(i18n('btns.converdel'), function(e) {
			
			var btn$ = $(e.target),
				list$ = btn$.parents('.list-group');

			K.Conver.delConver( convid );		
			btn$.parents('.list-group-item').remove();
		});
});

Template.item_conver.helpers({
	tit: function() {
		var title = _.str.truncate(this.title, 30);

		if(this.lastMsg)
			title = _.str.truncate(_.str.stripTags(this.lastMsg.body), 30);
		else
			title = i18n('titles.msgpriv');

		return title || '...';
	},
	usersIds: function() {
		//return _.last(_.without(this.usersIds, K.Profile.id), 3);
		return _.last(this.usersIds, 3);
	},	
	target: function() {

		if(this.targetType==='place')
			return K.newPlace(this.targetId);

		else if(this.targetType==='user')
			return K.newUser(this.targetId);
	}
});
