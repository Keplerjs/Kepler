
Template.tab_friends.helpers({
	friendsCommon: function() {
		if(this.friends)
			return _.intersection(this.friends, K.profile.data.friends);
	},	
	friendsOther: function() {
		if(this.friends)
			return _.difference(this.friends, K.profile.data.friends, [K.profile.id]);
	}
});