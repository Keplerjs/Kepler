
//TODO inserire limiti dimensioni del bbox...
//FIXME getPlacesByCheckins potrebbe essere una query troppo lenta con molte persone online
//TODO getPlacesByIds non si capisce xke serve questa conversione e in getUsersByIds() non serve!!
//TODO togliere settori da dentro i document place, metterli su collection a parte insieme alle vie
//TODO aggiungere caratteri di ricerca speciale, tipo ecco

getPlacesByCheckins = function(usersIds) {
	return Places.find({checkins: {$in: usersIds} }, { fields: Climbo.perms.placeItem });
};

getPlaceById = function(placeId) {
	return Places.find({_id: new Meteor.Collection.ObjectID(placeId) }, { fields: Climbo.perms.placePanel });
};

Meteor.methods({
	updatePlaceLoc: function(placeId, loc)	{//ricalcola valori geografici place
	
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
			 		cb(null, Climbo.geodata.aspect(loc) );
			 	},0);
			},
			ele: function(cb) {
				Meteor.setTimeout(function() {
			 		cb(null, Climbo.geodata.elevation(loc) );
			 	},0);
			},
			near: function(cb) {
				Meteor.setTimeout(function() {
			 		cb(null, Climbo.geodata.near(loc) );
			 	},0);
			},
			com: function(cb) {
				Meteor.setTimeout(function() {
			 		cb(null, Climbo.geodata.comune(loc) );
			 	},0);
			},
			prov: function(cb) {
				Meteor.setTimeout(function() {
			 		cb(null, Climbo.geodata.provincia(loc) );
			 	},0);
			},
			reg: function(cb) {
				Meteor.setTimeout(function() {
			 		cb(null, Climbo.geodata.regione(loc) );
			 	},0);
			}
			//TODO
			//tracks e pois
		},
		function(err, results) {
			Places.update({_id: new Meteor.Collection.ObjectID(placeId)}, {$set: results});
			console.log('setLoc', placeId, results);
		});

		//TODO blocca se non e' admin
		//http://stackoverflow.com/questions/12569712/meteor-calling-an-asynchronous-function-inside-a-meteor-method-and-returning-th
		//TODO usare Fiber e Future...	
	},
	// updatePlaceTracksPois: function() {
		
	// 	if(!this.userId) return null;

	// 	// Tracks.find().forEach(function (track) {
	// 	// 	setTrackProperties(track._id._str);
	// 	// 	console.log('FOREACH setTrackProperties', track._id._str, track.properties.name);
	// 	// });
	// 	console.log('updateTracks END ');
	// },
	delPlace: function(placeId) {
		if(!this.userId) return null;

		if(!Meteor.settings.public.editPlaces) return null;

		Places.remove({_id: new Meteor.Collection.ObjectID(placeId) });

		console.log('delPlace', placeId);
	},
	clonePlace: function(placeId) {
		if(!this.userId) return null;
		
		if(!Meteor.settings.public.editPlaces) return null;

		var place = getPlaceById(placeId).fetch()[0],
			offset = 0.008;

		place.loc[0] += offset;
		place.loc[1] += offset;
		
		place._id = new Meteor.Collection.ObjectID();
		place.name = place.name+'(copy)';

		var newId = Places.insert(place);
		
		//Meteor.call('updatePlaceLoc',newId, place.loc);
		console.log('clonePlace', placeId, newId);
		return newId._str;
	}
});
