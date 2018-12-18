
Categories = new Mongo.Collection('categories');

if(Meteor.isServer)
	Categories._ensureIndex({"name": 1},{unique: true});

Categories.allow({
	insert: function(userId, doc) {
		return true;
	},
	update: function(userId, doc) {
		return false;
	},	
	remove: function(userId, doc) {
		return false;
	}
});

Places.after.update(function(userId, doc, fieldNames, modifier, options) {

	if(_.contains(fieldNames,'cats') && modifier['$addToSet']) {

		var catData = {},
			cats = modifier.$addToSet.cats.$each;

		_.each(cats, function(cat) {

			catData = _.extend({}, K.schemas.cat, {
				name: cat,
				type: 'place',//user, place, all
				parent: ''
			});

			Categories.insert(catData);
		});
	}

});
//TODO
/*Categories.before.insert(function(userId, doc) {
	doc.createdAt = K.Util.time();
});*/

K.extend({
	findCatsByName: function(initial, type) {
		
		if(!initial) {
			return Categories.find({
				type: type
			}, {
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