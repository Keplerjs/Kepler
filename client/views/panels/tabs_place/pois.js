
Template.panel_pois.helpers({
	poisGroups: function() {	//raggruppa pois per tipo e mostra il numero

		var rdata = this.rData();

		if(!rdata || !_.isArray(rdata.pois)) return false;//non togliere

		var counts = _.countBy(rdata.pois, function(poi) {
			return poi.properties.tipo;
		});

		return _.map(counts, function(val, tipo) {
			return {
				tipo: tipo,
				count: val,
				titolo: i18n('ui.pois.'+tipo)
			};
		});
	}
});

Template.panel_pois.events({
	'click .panel-btn-pois': function(e, tmpl) {
		tmpl.data.loadPois(this.tipo);
	}
});