
K.extend({
	findUsersByCategory: function(cat) {
		return Users.find({
			cats: cat
		}, K.filters.userItem);
	}
});