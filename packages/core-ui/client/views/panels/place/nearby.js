
Template.tabPlace_ui_nearby.onCreated(function() {
	this.nearbyList = new ReactiveVar([]);
});

Template.tabPlace_ui_nearby.helpers({
	getNearbyList: function() {
		return Template.instance().nearbyList.get();
	}
});


Template.tabPlace_ui_nearby.events({
	'click .panel-btn-nearbyList': function(e, tmpl) {

		var icon$ = $(e.target).find('.icon');
		$(e.target).addClass('disabled');
		icon$.addClass('icon-loader');
		
		Meteor.subscribe('placesByNearby', tmpl.data.loc, function() {
			$(e.target).removeClass('disabled');
			icon$.removeClass('icon-loader');

			var places = K.findPlacesByNearby(tmpl.data.loc, 5000).fetch();

			places = _.filter(places, function(p) {
				return p._id !== tmpl.data._id;
			});

			places = _.first(places, 5);

			places = _.map(places, function(place) {
				return K.placeById(place._id);
			});
			
			tmpl.nearbyList.set(places);
		});
	}
});