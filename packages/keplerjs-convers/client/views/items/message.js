
Template.itemMsg.onRendered(function() {
	var list$ = $(this.firstNode).parents('.panel-body');
	list$.scrollTop( list$.prop('scrollHeight') );
	//autoscroll ad ogni nuovo messaggio
});
