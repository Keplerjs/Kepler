
getSectorsByIds = function(sectorsIds) {
	sectorsIds = _.map(sectorsIds, function(id) {
		return new Meteor.Collection.ObjectID(id);
	});
	return Sectors.find({_id: {$in: sectorsIds} });//, { fields: Climbo.perms.sectorItem });
};

getSectorsByLoc = function(ll) {
	return Sectors.find({
				loc: {
					'$near': ll,
					'$maxDistance': (Meteor.settings.public.maxSectorsDist/1000)/111.12
				}
		},{limit: Meteor.settings.public.maxSectors });
	//TODO , { fields: Climbo.perms.sectorItem });
};

Meteor.methods({
	getSectorsByIds: function(sectorsIds) {

		if(!this.userId) return null;

		console.log('getSectorsByIds',sectorsIds);

		return getSectorsByIds(sectorsIds).fetch();
	},
	getSectorsByLoc: function(loc) {

		if(!this.userId) return null;

		var sects = getSectorsByLoc(loc).fetch();

		console.log('getSectorsByLoc',sects.length);

		return sects;
	}
});
