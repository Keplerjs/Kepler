/*
	modulo che genera un finestra modale con un messaggio html generico
*/

Climbo.msg = {

	show: function(body, title, type) {

		title = title || '';
		type = type || 'info';	//success, info, warning, danger

		var dialog$ = $('#message'),
			title$ = dialog$.find('.modal-title'),
			body$ = dialog$.find('.modal-body');

		title$.html('<i class="icon icon-'+type+'"></i> '+title);
		body$.html(body);

		dialog$.modal();
	},

	hide: function() {
		var dialog$ = $('#message'),
			title$ = dialog$.find('.modal-title'),
			body$ = dialog$.find('.modal-body');

		dialog$.modal('hide');
		title$.empty();
		body$.empty();
	}
};

