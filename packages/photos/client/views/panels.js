
Template.panelPlaceEdit_photos.helpers({
	uploadDone: function() {
		var tmpl = Template.instance();
		return function(ret) {
			console.log('uploadDone', ret);

			if(ret.loc) {
				K.Map.showLoc(ret.loc);
				L.marker(ret.loc, {
					icon: L.divIcon({
						className: 'marker-photo',
						iconSize: [40,40],
						html: '<img src="'+ret.url+'" height="40" width="40" />'
					})
				}).addTo(K.Map.map);
			}
		}
	}
});

Template.panelPhotos_new.helpers({
	uploadDone: function() {
		var tmpl = Template.instance();
		return function(ret) {
			console.log('uploadDone', ret);
			
		}
	}
});

Template.tabPlace_photos.helpers({
	photos: function() {
		var data = Template.currentData();
		//TODO find query 
		//
		return []
	}
});