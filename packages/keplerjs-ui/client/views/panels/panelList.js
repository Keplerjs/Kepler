
Template.panelList.helpers({
	list: function() {
		var self = this;
		
		this.items = _.compact(this.items);

		if(_.isString(this.sortBy)) {
			this.items = _.sortBy(this.items, function(item) {
				return item ? K.Util.getPath(item,self.sortBy) : 0;
			});
		}
		else if(_.isFunction(this.sortBy)) {
			this.items = _.sortBy(this.items, this.sortBy);
		}

		if(this.items && this.sortDesc)
			this.items.reverse();

		return _.map(this.items, function(item) {
			return _.extend({}, item, {
				template: self.itemsTemplate || item.template
			});
		});
	}
});
