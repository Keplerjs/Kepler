
Template.itemConver.onRendered(function() {
	
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

Template.itemConver.helpers({
	usersIds: function() {
		return _.last(_.without(this.usersIds, K.profile.id), 3);
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

Template.itemConverNew.events({
	'click .conver-btn-new': function(e,tmpl) {
		e.preventDefault();
		var title = _.str.clean(tmpl.$('.conver-txt-new').val());
		
		if(!_.str.isBlank(title))
			K.conver.newConverInPlace(title, this.id);
	},
	'keydown .conver-txt-new': function(e,tmpl) {
		if(e.keyCode===13)//enter
		{
			e.preventDefault();
			tmpl.$('.conver-btn-new').trigger('click');
		}
	}
});