
Template.pageHome_stats.onCreated(function() {
	
	var self = this;

    self.stats = new ReactiveVar({
    	users: {properties: {count:0}},
    	places: {properties: {count:0}},
    });

console.log('onCreated', self.stats);

    Meteor.call('findStats', function(err, data) {

console.log('findStats', data);

		if(err)
            console.log(err);
        else
            self.stats.set({
            	users: data.users.properties.count,
            	places: data.places.properties.count
            });
	});
});

Template.pageHome_stats.helpers({
	stats: function() {
		return Template.instance().stats.get();
	}
});
