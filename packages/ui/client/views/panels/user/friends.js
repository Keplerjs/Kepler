
Template.tabUser_ui_friends.helpers({
	friendsCommon: function() {
		if(this.friends)
			return _.intersection(this.friends, K.Profile.data.friends);
	},
	friendsOther: function() {
		if(this.friends)
			return _.difference(this.friends, K.Profile.data.friends, [K.Profile.id]);
	}
});