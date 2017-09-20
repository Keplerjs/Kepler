
Template.pageHome_stats.onCreated(function() {
	
	var self = this;

    self.stats = new ReactiveVar({
    	users:0,
    	places:0
    });

    Meteor.call('findStats', true, true, function(err, data) {

		if(err)
            console.log(err);
        else
            self.stats.set({
            	users: data.users.stats.count,
            	places: data.places.stats.count
            });
	});
});

Template.pageHome_stats.helpers({
	stats: function() {
		return Template.instance().stats.get();
	}
});
