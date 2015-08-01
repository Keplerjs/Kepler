
Template.layoutMap.events({

/*	'click .sidebar-tabs a, touchstart .sidebar-tabs a': function(e, tmpl) {
		var $side = tmpl.$('#sidebar');

		if(!$side.hasClass('collapsed'))
			$side.addClass('collapsed');
	}*/
	'click .sidebar-close': function(e, tmpl) {
		tmpl.$('#sidebar').addClass('collapsed');
	}
});