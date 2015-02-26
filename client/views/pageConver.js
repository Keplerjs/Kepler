
Template.converInput.rendered = function() {
	this.$('textarea').expandTextarea();
};

Template.converInput.events({
	'keydown textarea': function(e,tmpl) {
		if(e.keyCode===13)//enter
		{
			e.preventDefault();
			var text$ = tmpl.$('textarea');			
			
			Climbo.convers.addMsgToConver(this._id, text$.val() );

			text$.val('');
		}
	}
});

Template.converMsgs.helpers({
	msgsMore: function() {
		return [];
	},
	msgsLast: function() {

			//TODO refactoring with new API

			var tmpl = Template.instance(),
				list$ = $(tmpl.firstNode).parents('.list-group');
			
			list$.scrollTop( list$.prop('scrollHeight') );

			return getMsgsByConver( Template.currentData()._id );
	}
});

Template.converMsgs.events({
	'click .conver-btn-more': function(e,tmpl) {
		e.preventDefault();
		$(e.target).prev().slideToggle();
	}
});

Template.itemMsg.rendered = function() {
	var list$ = $(this.firstNode).parents('.list-group');
	list$.scrollTop( list$.prop("scrollHeight") );
	//autoscroll ad ogni nuovo messaggio
};
