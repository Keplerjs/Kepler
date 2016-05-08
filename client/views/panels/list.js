
Template.panelList.helpers({
	list: function() {
		var itemsTemplate = this.itemsTemplate;
		
		if(this.sortBy)
			this.items = _.sortBy(this.items, function(item) {
				return item ? item[this.sortBy] : 0;
			});

		if(this.items && this.sortDesc)
			this.items.reverse();

		return _.map(this.items, function(item) {
			
			item.template = item.template || itemsTemplate;

			return item;
		});
	}
});
