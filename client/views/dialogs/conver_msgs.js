
Template.conver_msgs.helpers({
	msgsMore: function() {
		return [];
	},
	msgsLast: function() {
		if(Session.get('dialogConverId'))
		{
			var tmpl = UI._templateInstance(),
				list$ = $(tmpl.firstNode).parents('.list-group');
			
			list$.scrollTop( list$.prop('scrollHeight') );

			return getMsgsByConver( Session.get('dialogConverId') );
		}
	}
});

Template.conver_msgs.events({
	'click .conver-btn-more': function(e,tmpl) {
		e.preventDefault();
		$(e.target).prev().slideToggle();
	}
});

Template.item_msg.rendered = function() {
	var list$ = $(this.firstNode).parents('.list-group');
	list$.scrollTop( list$.prop("scrollHeight") );
	//autoscroll ad ogni nuovo messaggio
};
