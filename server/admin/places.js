var isAdmin = function() {
	if(!Meteor.user()) return false;
	return _.contains(Meteor.settings.adminUsers, Meteor.user().username);
};

Meteor.methods({
	adminCleanPlaceHist: function(placeName) {
		
		if(!isAdmin()) return null;

		var placeData = Places.findOne({name: placeName}),
			placeId = placeData._id;

		Users.update({_id: {$in: placeData.hist }}, {$pull: {hist: placeId} });
		Places.update(placeId, {
			$set: {
				hist: []
			}
		});

		console.log('adminCleanPlaceHist', placeName);
	},
	adminCleanPlaceCheckins: function(placeName) {
		
		if(!isAdmin()) return null;

		var placeData = Places.findOne({name: placeName}),
			placeId = placeData._id;

		Users.update({_id: {$in: placeData.checkins }}, {$set: {checkin: null} });
		Places.update(placeId, {
			$set: {
				checkins: []
			}
		});

		console.log('adminCleanPlaceHist', placeName);
	},
	adminUpdatePlaceLoc: function(placeId, loc)	{//ricalcola valori geografici place
	
		if(!this.userId) return null;

		if(!Meteor.settings.public.editPlaces) return null;
		
		async.parallel({
			loc: function(cb) {
				Meteor.setTimeout(function() {
					cb(null, loc);
				},0);
			},
			esp: function(cb) {
				Meteor.setTimeout(function() {
			 		cb(null, K.geoapi.aspect(loc) );
			 	},0);
			},
			ele: function(cb) {
				Meteor.setTimeout(function() {
			 		cb(null, K.geoapi.elevation(loc) );
			 	},0);
			},
			near: function(cb) {
				Meteor.setTimeout(function() {
			 		cb(null, K.geoapi.near(loc) );
			 	},0);
			},
			com: function(cb) {
				Meteor.setTimeout(function() {
			 		cb(null, K.geoapi.comune(loc) );
			 	},0);
			},
			prov: function(cb) {
				Meteor.setTimeout(function() {
			 		cb(null, K.geoapi.provincia(loc) );
			 	},0);
			},
			reg: function(cb) {
				Meteor.setTimeout(function() {
			 		cb(null, K.geoapi.regione(loc) );
			 	},0);
			}
			//TODO
			//tracks e pois
		},
		function(err, results) {
			Places.update({_id: new Meteor.Collection.ObjectID(placeId) }, {$set: results});
			console.log('setLoc', placeId, results);
		});

		//TODO blocca se non e' admin
		//http://stackoverflow.com/questions/12569712/meteor-calling-an-asynchronous-function-inside-a-meteor-method-and-returning-th
		//TODO usare Fiber e Future...	
	},
	adminDelPlace: function(placeId) {
		if(!this.userId) return null;

		if(!Meteor.settings.public.editPlaces) return null;

		Places.remove({_id: new Meteor.Collection.ObjectID(placeId) });

		console.log('delPlace', placeId);
	},
	adminClonePlace: function(placeId) {
		if(!this.userId) return null;
		
		if(!Meteor.settings.public.editPlaces) return null;

		var place = getPlaceById(placeId).fetch()[0],
			offset = 0.01;

		place.loc[0] += offset;
		place.loc[1] += offset;
		
		place._id = new Meteor.Collection.ObjectID();
		place.name = place.name+'(copy)';

		var newId = Places.insert(place);
		
		//Meteor.call('updatePlaceLoc',newId, place.loc);
		console.log('clonePlace', placeId, newId);
		return newId._str;
	},
	adminRenamePlace: function(placeId, name) {
		if(!this.userId) return null;

		if(!Meteor.settings.public.editPlaces) return null;

		Places.update({_id: new Meteor.Collection.ObjectID(placeId) }, {$set: {name: name} });

		console.log('renamePlace', placeId);
	}
});