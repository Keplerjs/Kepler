/*
	modulo che genera un finestra modale con un elenco di elementi generici: places o utenti conversazioni
*/

//TODO inserirt option for showing columns instead rows

Template.pageList.helpers({
	items: function() {
		var itemsTemplate = this.itemsTemplate;
		
		if(this.sortBy)
			this.items = _.sortBy(this.items, function(item) {
					return item ? item[this.sortBy] : 0;
				});

		if(this.sortDesc)
			this.items.reverse();

		return _.map(this.items, function(item) {
			
			item.template = item.template || itemsTemplate;

			return item;
		});
	}
});
