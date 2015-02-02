

Template.item_conver.rendered = function() {
	
	this.$('.conver-btn-del').btsConfirmButton({
			msg: Climbo.i18n.ui.btns.converdel
		}, function(e) {
			
			var btn$ = $(e.target),
				list$ = btn$.parents('.list-group');
			
			Climbo.convers.delConver( btn$.data('convid') );		
			btn$.parents('.list-group-item').remove();
			if(list$.is(':empty'))
				Climbo.dialogList.hide();		
		});
};

Template.item_conver.helpers({
	usersIds: function() {
		return _.last(_.without(this.usersIds, Climbo.profile.id), 3);
	},
	tit: function() {
		if(this.placeId)
			return _.str.truncate(this.title, 30);
		else if(this.lastMsg)
			return '<small class="text-gray">'+_.str.quote(_.str.truncate(_.str.stripTags(this.lastMsg.body), 30))+'</small>';
		else
			return Climbo.i18n.ui.titles.msgpriv;
	}
});