
Template.itemCat.onRendered(function() {
	
	var self = this;

	self.$('.btn-catdel').btsConfirmButton(function(e) {

		K.Admin.call('removeCat', self.data.name, self.data.type);
	});
});

Template.formSearchCats.onRendered(function() {
	var self = this;

	$(self.firstNode).parent().siblings('.list-items').btsListFilter('.cats-search', {
		itemChild: '.label',
		loadingClass: 'loading-lg',
		sourceData: function(val, callback) {

			Meteor.subscribe('catsByName', val, self.data.typeCat, function() {
				
				var cats = K.findCatsByName(val, self.data.typeCat).fetch();

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
			name = _.str.clean(input$.val());
			type = tmpl.data.typeCat;

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


/*Template.pageAdminUser_foliolum_cats.helpers({
	allCats: function() {

		var itemCats = this.getCats(),
			activeCats = K.Cats.getCats('user');

		var ret = _.map(_.union(activeCats, itemCats), function(c) {
			return {
				val: c,
				name: c,
				active: _.contains(itemCats, c)
			};
		});

		return ret;
	}
});

Template.pageAdminUser_foliolum_cats.events({
	'change #cats-edit input': _.debounce(function(e,tmpl) {
		var itemId = tmpl.data._id,
			input$ = $(e.currentTarget),
			checked = input$.is(':checked'),
			val = input$.val();

		var cb = function() {
			K.userById(itemId).update();
		};

		if(!checked)
			K.Admin.call('removeCatsFromUser', itemId, val, cb);
		else
			K.Admin.call('addCatsToUser', itemId, val, cb);
	}, 300)
});
*/

Template.pageAdminUser_cats.onRendered(function() {

	var self = this,
		input$ = self.$('.input-cats');

	// http://bootstrap-tagsinput.github.io/bootstrap-tagsinput/examples/
	input$.tagsinput({
		tagClass: 'label label-primary',
		freeInput: false,
		typeaheadjs: {
			// https://github.com/twitter/typeahead.js
			// 
			hint: true,
			highlight: true,
			minLength: 1,
			limit: 30,
			//name: 'catnames',
	    	displayKey: 'name',
	    	valueKey: 'name',
			source: function(text, sync, cb) {
				
				if(!text.length) return [];

				Meteor.subscribe('catsByName', text, 'user', function() {
					
					var res = K.findCatsByName(text,'user').fetch();
					
					res = _.map(res, function(c) {
						c.text = c.name;
						return c;
					});

					cb(res);
				});

				return null
			}
		}
	});

	var cb = function() {
		K.userById(self.data.id).update();
	};

	input$
	.on('itemAdded', function(e) {
		K.Admin.call('addCatsToUser', self.data.id, e.item, cb);
	})
	.on('itemRemoved', function(e) {
		K.Admin.call('removeCatsFromUser', self.data.id, e.item, cb);
	});
});

Template.pageAdminUser_cats.helpers({
	allCats: function() {

		var itemCats = this.getCats(),
			activeCats = K.Cats.getCats('user');

		var ret = _.map(_.union(activeCats, itemCats), function(c) {
			return {
				val: c,
				name: c,
				active: _.contains(itemCats, c)
			};
		});

		return ret;
	}
});

Template.pageAdminUser_cats.events({
	'change #cats-edit input': _.debounce(function(e, tmpl) {
		var itemId = tmpl.data._id,
			input$ = $(e.currentTarget),
			checked = input$.is(':checked'),
			val = input$.val();

		inputtags$ = tmpl.$('.input-cats');

		var cb = function() {
			K.userById(itemId).update();
		};

		if(!checked) {
			inputtags$.tagsinput('remove', val);

			Meteor.call('removeCatsFromUser', itemId, val, cb);
		}
		else {
			inputtags$.tagsinput('add', val);

			Meteor.call('addCatsToUser', itemId, val, cb);
		}
	}, 300)
});

