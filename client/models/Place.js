/*
	loc: []		    //lat,lng
	name: ''	    //place title
	type: ''	    //rock	indoor	boulder	long
	active: 0	    //place visibile
	rank: 0		    //sommati di tutti i preferiti degli utenti
	ele: 0		    //elevazione
	esp: 0		    //esposione	 azimut
	naz: ''		    //nazione
	near: ''	    //localita
	reg: ''		    //regione
	checkins: [],	//utenti in place	
	hist: [],		//checkins recenti
	convers: []		//ids conversazioni in bacheca
	sectors: []		//elenco id dei settori	
	tracks: -1		//numero tracce
	pois: -1		//numero pois
	photos: []	
	tracks/pois se === -1 fai richiesta ...ByLoc
*/
Climbo.Place = Climbo.Class.extend({

	id: null,
	data: {},					//dati orignali dal db
	cache: {},					//caching for remote data	
	tmpl: Template.item_place,	//template usato nelle liste
	type: 'place',

	init: function(placeId) {

		var self = this;

		self.id = placeId;

		//REACTIVE SOURCES:
		self._dep = new Deps.Dependency();
		self.rData = function() {	//Data Reactive Source
			self._dep.depend();
			//TODO raggruppare dati reattivi in self.rdata
			//e usare solo quelli come sorgente reattiva
			//TODO ritornare solo dati reattivi: checkins,stars,weather
			return self;
		};
		self.update = function(comp) {	//sincronizza istanza con dati nel db

			self.data = Places.findOne(new Meteor.Collection.ObjectID(self.id));
			
			//FIXME a volte: findOne ritorna null... xke forse i dati non vengono scaricati in tempo
			//FIXME forse per il bug precendete a volte scade la computation di e autorun i stoppa

			_.extend(self, self.data, self.cache);

			self._dep.changed();
		};
		Deps.autorun( self.update );

		//MAP OBJECTS:
		self.icon$ = L.DomUtil.create('div');
		self.icon = new L.NodeIcon({
			className: (self.name ? 'marker-'+self.type : 'marker-gray'),
			nodeHtml: self.icon$
		});
		self.marker = new L.Marker(self.loc, {icon: self.icon});
		self.marker.place = self;
		self.marker.on('add', function() {
				Blaze.renderWithData(Template.marker_checkins, self, self.icon$);
				//render the template after dom append
			})
			.on('click mousedown', function(e) {
				if(!this._popup) {
					self.popup$ = L.DomUtil.create('div','popup-place');
					Blaze.renderWithData(Template.popup_place, self, self.popup$);
					this.bindPopup(self.popup$, { closeButton:false, minWidth:180, maxWidth:320 });
				}
			});

	},

	//PUBLIC METHODS:
	loadLoc: function() {
		var self = this;
		if(Climbo.util.valid.loc(self.loc))
		{
			self.marker.addTo(Climbo.map.layers.cluster);
			//patch! per caricare marker di place non scaricati da layerjson
			Climbo.map.loadLoc(self.loc);
			setTimeout(function() {
				self.marker.fire('click');
				self.icon.animate();
			},400);
		}
	},

	isOutdoor: function() {
		return this.type != 'indoor';
	},

	isCheckin: function() {
		//return Meteor.user() && (Meteor.user().checkin === this.id);
		var place = Climbo.profile.getCheckin();
		return place && place.id === this.id;
	},
	
	isFavorite: function() {
		return Meteor.user() && _.contains(Meteor.user().favorites, this.id);
	},

	checkinsCount: function() {
		this._dep.depend();
		return this.checkins && this.checkins.length;
	},

	getRank: function() {
		this._dep.depend();
		return this.rank;
	}
});

//TODO move to Climbo.Class.newItem()
Climbo.newPlace = function(id)
{
	if(!id) return null;
	var i = 'place_'+id;
	if(!Climbo.placesById[i])
		Climbo.placesById[i] = new Climbo.Place(id);
	return Climbo.placesById[i];
};

