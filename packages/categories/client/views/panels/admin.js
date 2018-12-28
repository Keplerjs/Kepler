
Template.itemCat.onRendered(function() {
	
	var self = this;

	self.$('.btn-catdel').btsConfirmButton(function(e) {

		K.Admin.call('removeCat', self.data.name, self.data.type);
	});
});

Template.formSearchCats.onRendered(function() {
	var self = this,
		typeCat = Router.current().params.type;

	$(self.firstNode).parent().siblings('.list-items').btsListFilter('.cats-search', {
		itemChild: '.label',
		loadingClass: 'loading-lg',
		sourceData: function(val, callback) {

			Meteor.subscribe('catsByName', val, typeCat, function() {
				
				var cats = K.findCatsByName(val, typeCat).fetch();

				callback(cats);
			});
		},
		sourceNode: function(data) {
			var item$ = $('<li class="list-group-item"></li>');
			Blaze.renderWithData(Template.itemCat, data, item$[0]);
			return item$;
		},
		cancelNode: function() {
			return self.$('.search-canc');
		}
	});
});

Template.formSearchCats.events({
	'click .cat-btn-new': function(e,tmpl) {
		e.preventDefault();
		
		var input$ = tmpl.$('.cat-name-new'),
			name = _.str.clean(input$.val()),
			type = Router.current().params.type;

		if(type!=='place' && type!=='user')
			type = undefined;

		if(!_.str.isBlank(name)) {
			K.Admin.call('insertCat', name, type, function(err,ret) {
				input$.val('')
			});
		}
	},
	'keydown .cat-name-new': function(e,tmpl) {
		if(e.keyCode===13)//enter
		{
			e.preventDefault();
			tmpl.$('.cat-btn-new').trigger('click');
		}
	}
});