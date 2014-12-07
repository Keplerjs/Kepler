
Template.tab_friends.helpers({
	friendsCommon: function() {
		if(this.data.friends)
			return _.intersection(this.data.friends, Climbo.profile.data.friends);
	},	
	friendsOther: function() {
		if(this.data.friends)
			return _.difference(this.data.friends, Climbo.profile.data.friends, [Climbo.profile.id]);
	}
});