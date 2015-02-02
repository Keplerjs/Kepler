
Template.panel_tracks.helpers({
	tracksAccess: function() {

/*	TODO usare quando si fa subscribe on Climbo.Place.loadTracks()!

		var tracksIds = this.rData().tracks,
			tracksData = Tracks.find({_id: {$in: tracksIds}}).fetch(),
			accessProps = [];
			//ogni track puo avere piu di un sentiero
			//ritorna solo sentieri di tipo access
		if(tracksData[0].features)
			wwreturn tracksData[0].features[0].properties;
		// _.each(tracksData, function(track) {
		// 	for(var f in track.features)
		// 		//if(track.features[f].properties.tipo=='access')
		// 		accessProps.push(track.features[f].properties);
		// });
		//return accessProps;
*/
		var rdata = this.rData();

		if(!rdata || !_.isArray(rdata.tracks)) return false;//non togliere

		var tracks = _.filter(rdata.tracks, function(track) {
			return track && track.properties.tipo==='access';
		});

		if(tracks.length===0) return false;//non togliere

		return _.pluck(tracks,'properties');
	}
});

Template.panel_tracks.events({
	'click .panel-btn-tracks': function(e, tmpl) {
		tmpl.data.loadTracks();
	}
});
