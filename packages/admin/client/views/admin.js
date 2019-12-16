
Template.panelAdminMethods_search.onRendered(function() {
	var self = this;

	$(self.firstNode).parent().siblings('.list-items').btsListFilter('.methods-search', {
		itemChild: '.method-name',
		loadingClass: 'loading-lg',
		resetOnBlur: false,
		initial:false,
		cancelNode: function() {
			return self.$('.search-canc');
		}
	});
});

Template.itemAdminMethod.events({
	'click .btn-run': function(e, tmpl) {
		var name = $(e.currentTarget).data('name'),
			$inp = $(e.currentTarget).siblings('input'),
			val = $inp.val();
		var ret = K.Admin[name](val);
		$inp.val('');
		/*if(ret)
			K.Alert.info(ret)*/
	}
});