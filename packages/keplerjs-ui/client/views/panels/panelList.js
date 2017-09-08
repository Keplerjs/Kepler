
Template.panelList.helpers({
	list: function() {
		var self = this;
		
		this.items = _.compact(this.items);

		if(this.sortBy)
			this.items = _.sortBy(this.items, function(item) {
				return item ? K.Util.getPath(item,self.sortBy) : 0;
			});

		if(this.items && this.sortDesc)
			this.items.reverse();

		return _.map(this.items, function(item) {
			return _.extend({}, item, {
				template: self.itemsTemplate || item.template
			});
		});
	}
});
