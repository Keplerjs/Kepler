
Template.tab_friends.helpers({
	friendsCommon: function() {
		if(this.friends)
			return _.intersection(this.friends, Climbo.profile.data.friends);
	},	
	friendsOther: function() {
		if(this.friends)
			return _.difference(this.friends, Climbo.profile.data.friends, [Climbo.profile.id]);
	}
});