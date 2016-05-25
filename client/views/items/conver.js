
Template.item_conver.onRendered(function() {
	
	var convid = this.data._id;

	this.$('.conver-btn-del').btsConfirmButton({
			msg: i18n('btns.converdel')
		}, function(e) {
			
			var btn$ = $(e.target),
				list$ = btn$.parents('.list-group');

			K.conver.delConver( convid );		
			btn$.parents('.list-group-item').remove();
		});
});

Template.item_conver.helpers({
	usersIds: function() {
		var ids = this.usersIds;
		
		if(!this.placeId)
			ids = _.without(ids, K.profile.id);

		return _.last(ids, 3);
	},
	tit: function() {
		var title;

		if(this.placeId)
			title = _.str.truncate(this.title, 30);
		else if(this.lastMsg)
			title = '<small class="text-gray">'+_.str.truncate(_.str.stripTags(this.lastMsg.body), 30)+'</small>';
		else
			title = i18n('titles.msgpriv');

		return title || '...';
	}
});
