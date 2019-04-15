
Categories = new Mongo.Collection('categories');

if(Meteor.isServer) {
	console.log('Cats: createIndex...')
	Categories._ensureIndex({name: 1, type:1},{unique: true});
}

Categories.allow({
	insert: function(userId, doc) {
		return false;
	},
	update: function(userId, doc) {
		return false;
	},	
	remove: function(userId, doc) {
		return false;
	}
});

K.extend({
	findCatsActive: function() {
		return Categories.find({
			active: true
		}, {
			sort: { name:1 }
		});
	},
	findCatsByType: function(type) {
		var w = {
				active: true
			};

		if(_.isString(type))
			w.type = type;

		return Categories.find(w, {
				sort: { rank:-1, name:1 },
				limit: 50
			});
	},	
	findCatsByName: function(initial, type) {
		
		if(!initial) {

			var w = {
				active: true
			};

			if(_.isString(type))
				w.type = type;
			
			return Categories.find(w, {
					sort: { name:1 },
					limit: 50
				});
		}

		initial = K.Util.sanitize.regExp(initial);

		if(!initial.length)
			return null;

		var ex = new RegExp('^'+ initial, 'i');
			
		return Categories.find({
				active: true,
				name: ex,
				type: type
			}, {
				sort: { name:1 },
				limit: 50
			});
	}
});