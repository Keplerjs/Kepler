
Template.panelList.helpers({
	list: function() {
		var self = this;
		
		this.items = _.compact(this.items);

		if(this.sortBy)
			this.items = _.sortBy(this.items, function(item) {
				return item ? item[self.sortBy] : 0;
			});

		if(this.items && this.sortDesc)
			this.items.reverse();

		return _.map(this.items, function(item) {
			item.template = self.itemsTemplate;
			return item;
		});
	}
});

Template.search_user.onRendered(function() {
	
	$(this.firstNode).parent().siblings('.list-items').btsListFilter('.users-search', {
		itemChild: '.user-btn-name',
		loadingClass: 'loading-lg',
		sourceData: function(val, callback) {
			
			Meteor.subscribe('usersByName', val, function() {
				
				var users = _.map( getUsersByName(val).fetch(), function(user) {
					return K.newUser(user._id);
				});

				callback(users);
			});
		},
		sourceNode: function(data) {
			var item$ = $('<li class="list-group-item"></li>');
			Blaze.renderWithData(Template.item_user, data, item$[0]);
			return item$;
		},
		cancelNode: function() {
			return '<span class="btn form-control-feedback" aria-hidden="true"><i class="icon icon-canc"></i></span>';
		}
	});

	this.$('#switch_online').bootstrapSwitch({
		size: 'mini',		
		onColor: 'success',		
		state: K.profile.getOnline(),
		onSwitchChange: function (e, stat) {
			K.profile.setOnline(stat);
		}
	});
});

Template.search_place.onRendered(function() {

	$(this.firstNode).parent().siblings('.list-items').btsListFilter('.places-search', {
		itemChild: '.place-btn-name',
		loadingClass: 'loading-lg',
		sourceData: function(val, callback) {
			
			Meteor.subscribe('placesByName', val, function() {
			
				var places = _.map( getPlacesByName(val).fetch(), function(place) {
					return K.newPlace(place._id._str);
				});

				callback(places);
			});
		},
		sourceNode: function(data) {
			var item$ = $('<li class="list-group-item"></li>');
			Blaze.renderWithData(Template.item_place_search, data, item$[0]);
			return item$;
		},
		cancelNode: function() {
			return '<span class="btn form-control-feedback" aria-hidden="true"><i class="icon icon-canc"></i></span>';
		}
	});
});

Template.conver_new.events({
	'click .conver-btn-new': function(e,tmpl) {
		e.preventDefault();
		var title = _.str.clean(tmpl.$('.conver-txt-new').val());
		
		if(!_.str.isBlank(title))
			K.conver.newConverInPlace(title, this.id);
	},
	'keydown .conver-txt-new': function(e,tmpl) {
		if(e.keyCode===13)//enter
		{
			e.preventDefault();
			tmpl.$('.conver-btn-new').trigger('click');
		}
	}
});


Template.list_notif_clean.events({
	'click .notif-btn-clean': function(e,tmpl) {
		e.preventDefault();
		K.profile.cleanNotif();
	}
});