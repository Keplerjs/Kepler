/*
	class Place with Sectors support
*/
Climbo.Place.include({

	cache: {
		sectors: null
	},

	loadSectors: function() {

		var self = this;

		if( self.sectors > 0 && self.cache.sectors)
			self.showSectors( self.cache.sectors );
		else
			Meteor.call('getSectorsByLoc', self.loc, function(err, sectors) {

				if(sectors && sectors.length > 0)
				{
					self.cache.sectors = sectors;
					self.update();
					self.showSectors( sectors );
				}
				else
					self.sectors = 0;
			});
		// if(self.sectors.length > 0)
		// 	Meteor.subscribe('sectorsByLoc', self.loc, function() {
		// 		Climbo.dialogList.show({
		// 			title: '<i class="icon icon-sectors"></i> Settori di '+ _.str.capitalize(self.name),
		// 			className: 'sectors',
		// 			items: _.map(self.sectors, function(id) {
		// 				var item = Sectors.findOne(new Meteor.Collection.ObjectID(id));
		// 				item.tmpl = Template.item_sector;
		// 				return item;
		// 			}),
		// 			sortBy: 'name'
		// 		});
		// 	});
	},

	showSectors: function(sectors) {
		Climbo.dialogList.show({
			title: '<i class="icon icon-sectors"></i> Settori di '+ _.str.capitalize(self.name),
			className: 'sectors',
			items: _.map(sectors, function(sector) {
				sector.tmpl = Template.item_sector;
				return sector;
			}),
			sortBy: 'name'
		});
	}
});