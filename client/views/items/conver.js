
Template.itemConver.onRendered(function() {
	
	this.$('.conver-btn-del').btsConfirmButton({
			msg: i18n('ui.btns.converdel')
		}, function(e) {
			
			var btn$ = $(e.target),
				list$ = btn$.parents('.list-group');
			
			Climbo.convers.delConver( btn$.data('convid') );		
			btn$.parents('.list-group-item').remove();
			if(list$.is(':empty'))
				Climbo.dialogList.hide();		
		});
});

Template.itemConver.helpers({
	usersIds: function() {
		return _.last(_.without(this.usersIds, Climbo.profile.id), 3);
	},
	tit: function() {
		if(this.placeId)
			return _.str.truncate(this.title, 30);
		else if(this.lastMsg)
			return '<small class="text-gray">'+_.str.quote(_.str.truncate(_.str.stripTags(this.lastMsg.body), 30))+'</small>';
		else
			return i18n('ui.titles.msgpriv');
	}
});

Template.itemConverNew.events({
	'click .conver-btn-new': function(e,tmpl) {
		e.preventDefault();
		var title = _.str.clean(tmpl.$('.conver-txt-new').val());
		
		if(!_.str.isBlank(title))
			Climbo.convers.newConverInPlace(title, this.placeId);
		//ricarica elenco convers di place
	},
	'keydown .conver-txt-new': function(e,tmpl) {
		if(e.keyCode===13)//enter
		{
			e.preventDefault();
			tmpl.$('.conver-btn-new').trigger('click');
		}
	}
});