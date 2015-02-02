/*
	modulo che genera un finestra modale con un elenco di elementi generici: places o utenti conversazioni
*/

//TODO rinomina in modalList

//TODO inserire opzione per mostrare colonne invece di righe

Climbo.dialogList = {

	show: function(options) {

		var dialog$ = $('#dialoglist'),
			title$ = dialog$.find('.modal-title'),
			header$ = dialog$.find('.header-item'),
			list$ = dialog$.find('.list-items'),
			opts = _.defaults(options, {
				title: 'Lista',
				header: null,
				template: null,
				items: [],
				sortby: null,
				desc: false,
				className: ''
			});
		
		list$.empty();
		header$.empty();
		dialog$.attr('class','modal '+opts.className);
		title$.html(opts.title);

		if(opts.sortby)
			opts.items = _.sortBy(opts.items, function(item) {
							return item ? item[opts.sortby] : 0;
						});
		if(opts.desc)
			opts.items.reverse();
		
		if(opts.header)
			Blaze.renderWithData(opts.header.tmpl, opts.header, header$.get(0) );

		_.each(opts.items, function(item) {
			Blaze.renderWithData(Template.dialog_list_item,
				_.extend(item, {tmpl: opts.template ? Template[opts.template] : item.tmpl }),
				list$.get(0) );
		});

		dialog$.modal();
	},

	hide: function() {
		var dialog$ = $('#dialoglist'),
			title$ = dialog$.find('.modal-title'),
			header$ = dialog$.find('.first-items'),
			list$ = dialog$.find('.list-items');

		dialog$.modal('hide');
		dialog$.attr('class','modal ');
		title$.empty();
		list$.empty();
	}
};

