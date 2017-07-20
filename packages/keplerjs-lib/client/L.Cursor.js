
L.Cursor = L.Class.extend({
	
	includes: L.Mixin.Events,

	options: {
	},

	initialize: function(options) {
		L.Util.setOptions(this, options || {});
	},

	onAdd: function(map) {

		var self = this;

		self._map = map;

		self.marker = self._createMarker();
		self.popup$ = self._createPopup();
		
		self._map.on('click', self._onClick, self);
	},

	onRemove: function(map) {
		map.off('click', this._onClick, this);
		map.removeLayer(this.marker);
	},
	
	_onClick: function(e) {
		if(this._map.hasLayer(this.marker))
			this.hide();
		else
			this.setLoc(e.latlng);
	},

	hide: function() {
		this._map.removeLayer(this.marker);
	},
	setLoc: function(latlng) {
		this.marker.addTo(this._map).setLatLng(latlng);
	},
	addTo: function (map) {
		map.addLayer(this);
		return this;
	},
	_createMarker: function() {
		return L.marker([0,0], {
			icon: new L.NodeIcon({
				nodeHtml: L.DomUtil.create('div'),
				className: 'marker-cursor'
			})
		})
		.on('mousedown', L.DomEvent.stop, this)
		.on('mousedown', this.pickMarkerLocation, this);
	},
	_createPopup: function() {
		var div = L.DomUtil.create('div',' ');
		this.marker.bindPopup(div, { closeButton: false, minWidth: 200});
		return div;
	},
	pickMarkerLocation: function(e) {
		var self = this;
		self.popup$.innerHTML = '';
		self.fire('popupopen', {
			latlng: self.marker.getLatLng()
		});
	}
});

L.cursor = function (opts) {
    return new L.Cursor(opts);
};
