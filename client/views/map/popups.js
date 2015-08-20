
Template.popup_place.helpers({
	editPlaces: function() {
		return Meteor.settings.public.editPlaces;
	}
});

Template.popup_place.events({
//	debug actions
	'click .popup-clone': function(e,tmpl) {
		if(Meteor.settings.public.editPlaces)
			Meteor.call('clonePlace', this.id, function(err, newPlaceId) {
				Meteor.subscribe('placeByIds', [newPlaceId], function() {	//carica tutti i dati della place
					Climbo.newPlace(newPlaceId);//.loadLoc();
				});
			});
	},
	'click .popup-move': function(e,tmpl) {
		if(Meteor.settings.public.editPlaces) {
			
			//TODO conferma dragdrop

			if(this.marker.draggable) {
				$(e.target).text('Move');
				var ll = this.marker.getLatLng(),
					newLoc = [ll.lat, ll.lng];
				if(confirm("Aggiornare posizione???")) {
					Meteor.call('updatePlaceLoc', this.id, newLoc);
				}
			}
			else
				$(e.target).text('Save');

			this.marker.switchDrag();			
		}
	},	
	'click .popup-del': function(e,tmpl) {
		if(Meteor.settings.public.editPlaces) {
			var that = this,
				ret = confirm("Eliminare?");
			if(ret) {
				Meteor.call('delPlace', that.id, function(err) {
					Climbo.map.leafletMap.removeLayer(that.marker);
				});
			}
		}
	}	
});

//HELPERS POPUP TRACK
Template.popup_track.helpers({
	isSalita: function() {
		return this.dis > 0;
	}
});
