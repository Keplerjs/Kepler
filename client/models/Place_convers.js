/*
	class Place with Conversations support
*/
Climbo.Place.include({

	loadConvers: function() {
		
		var self = this;

		Meteor.subscribe('conversByIds', self.convers, function() {
			
			var items =  Convers.find({_id: {$in: self.convers}}).fetch(),
				title = Climbo.i18n.ui.titles.conversplace+' '+ _.str.capitalize(self.name);

			Climbo.dialogList.show({
				title: '<i class="icon icon-mes"></i> '+title,
				className: 'convers_place',
				header: {placeId: self.id, tmpl: Template.conver_new},
				items: _.map(items, function(item) {
					item.tmpl = Template.item_conver;
					return item;
				})
			});
		});
	}
});