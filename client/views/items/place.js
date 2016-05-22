
Template.place_btns3.events({
	'change .place-btn-checkin :checkbox': function(e, tmpl) {//MAI USARE CLICK, xke genera due esecuzioni!
		if(e.target.checked)
			K.profile.addCheckin(this.id);
		else
			K.profile.removeCheckin(this.id);
	},
	'change .place-btn-star :checkbox': function(e, tmpl) {//MAI USARE CLICK, xke genera due esecuzioni!
		if(e.target.checked)
			K.profile.addFavorite(this.id);
		else
			K.profile.removeFavorite(this.id);
	}
});

Template.item_place_nearby.events({	
	'mouseenter .well': function(e, tmpl) {
		e.preventDefault();
		//this.marker.fire('click')
		this.icon.animate();
	}
});

Template.search_place.onRendered(function() {
	
	$(this.firstNode).parent().siblings('.list-group').btsListFilter('.places-search', {
		itemChild: '.place-btn-name',
		sourceData: function(val, callback) {
			var list$ = $(this);
			
			list$.addClass('loading-lg');
			Meteor.subscribe('placesByName', val, function() {
				list$.removeClass('loading-lg');
				var ids = _.pluck(getPlacesByName(val).fetch(), '_id');
				callback( _.map(ids, K.newPlace) );
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
