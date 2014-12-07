/*
	classe Place

	loc: []		//lat,lng
	name: ''	//place title
	type: ''	//rock	indoor	boulder	long
	active: 0	//place visibile
	rank: 0		//sommati di tutti i preferiti degli utenti
	ele: 0		//elevazione
	esp: 0		//esposione	 azimut
	naz: ''		//nazione
	near: ''	//localita
	reg: ''		//regione
	checkins: [],	//utenti in place	
	hist: [],		//checkins recenti
	convers: []		//ids conversazioni in bacheca
	photos: []
	sectors: []		//elenco id dei settori	
	tracks: -1		//numero tracce
	pois: -1		//numero pois
	tracks/pois se === -1 fai richiesta ...ByLoc
*/
Climbo.Place = function(placeId)
{
	var self = this;

	self.id = placeId;	//id stringa
	self.data = {};		//dati orignali dal db
	self.tmpl = Template.item_place;
	//template usato nelle liste, TODO rinominare in itemTmpl

	self.cache = {};

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

		if(comp && comp.stopped)
			console.log('place autorun STOPPED',self.id,self.name,self.data);

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
			UI.insert(UI.renderWithData(Template.marker_checkins, self), self.icon$);
			//renderizza il template dopo l'inserimento nel DOM
		})
		.on('click mousedown', function(e) {
			if(!this._popup) {
				self.popup$ = L.DomUtil.create('div','popup-place');
				UI.insert(UI.renderWithData(Template.popup_place, self), self.popup$);
				this.bindPopup(self.popup$, { closeButton:false, minWidth:180, maxWidth:320 });
			}
		})
		.on('dblclick', function(e) {
			self.loadPanel();
		});

//PUBLIC METHODS:
	self.loadLoc = function() {
		// if(Climbo.map.layers.cluster.hasLayer(self.marker))
		// 	Climbo.map.layers.cluster.zoomToShowLayer(self.marker);
		// 	//var cen = markerClusterGroup.getVisibleParent(self.marker).getLatLng());
		self.marker.addTo(Climbo.map.layers.cluster);//patch! per caricare marker di place non scaricati da layerjson
		Climbo.map.loadLoc(self.loc);

		setTimeout(function() {
			self.marker.fire('click');	//crea e apre il popup
			self.icon.animate();
		},400);
	};
	
	self.loadPanel = function() {

		Meteor.subscribe('placeById', self.id, function() {	//carica tutti i dati della place
			
			self.loadTracks(false);
			self.loadPois(null,false);
			//load in self.cache without show on map

			Climbo.map.loadPanelPlace(self.id);
		});
	};

	self.loadCheckins = function() {

		if(self.checkins.length===0) return;

		Meteor.subscribe('usersByIds', self.checkins, function() {
			Climbo.dialogList.show({
				title: '<i class="icon icon-users"></i> Climbers a '+ _.str.capitalize(self.name),
				className: 'checkins',
				items: _.map(self.checkins, Climbo.newUser),
				sortby: 'username'
			});
		});
	};

	self.isOutdoor = function() {
		return self.type != 'indoor';
	};

	self.isCheckin = function() {
		//return Meteor.user() && (Meteor.user().checkin === self.id);
		var place = Climbo.profile.getCheckin();
		return place && place.id === self.id;
	};
	
	self.isFavorite = function() {
		return Meteor.user() && _.contains(Meteor.user().favorites, self.id);
	};

	self.checkinsCount = function() {
		self._dep.depend();
		return self.checkins && self.checkins.length;
	};

	self.getRank = function() {
		self._dep.depend();
		return self.rank;
	};
};

Climbo.Place.include = function (props) {
	_.extend(this.prototype, props);
};

Climbo.newPlace = function(placeId)
{
	if(!placeId) return null;
	if(!Climbo.placesById[ placeId ])
		Climbo.placesById[ placeId ] = new Climbo.Place(placeId);
	Climbo.placesByName[ (Climbo.placesById[ placeId ].name || placeId) ] = Climbo.placesById[ placeId ];
	return Climbo.placesById[ placeId ];
};

