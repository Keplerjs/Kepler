
Categories = new Mongo.Collection('categories');

if(Meteor.isServer)
	Categories._ensureIndex({"name": 1},{unique: true});

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
	findCatsByName: function(initial, type) {
		
		if(!initial) {

			var w = {
				active: true
			};

			if(_.isString(type))
				w.type = type;
			
			return Categories.find(w, {
				sort: { name:1 },
				limit: 30
			});
		}

		initial = K.Util.sanitize.regExp(initial);

		if(!initial.length)
			return null;

		var ex = new RegExp('^'+ initial, 'i');
			
		var curCat = Categories.find({
				name: ex,
				type: type
			}, {
				sort: { name:1 },
				limit: 30
			});

		return curCat;
	}
});