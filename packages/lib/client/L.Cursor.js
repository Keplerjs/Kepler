
//L.Cursor = L.Class.extend({	//leaflet 0.7.7
L.Cursor = L.Layer.extend({
	//includes: L.version[0] =='1' ? L.Evented.prototype : L.Mixin.Events,
	
	options: {
		className: 'leaflet-div-icon',
	},	

	initialize: function(options) {
		L.Util.setOptions(this, options || {});
		this.icon = new L.NodeIcon({
			nodeHtml: L.DomUtil.create('div')
		});
		this.marker = L.marker([0,0], {
			//TODO draggable: true,
			icon: this.icon
		});/*.on('dragend', function(e) {
			this.openPopup();
		})*/
	},
	onAdd: function(map) {
		this._map = map;		
		this._map.on('click', this._onSwitch, this);
	},
	onRemove: function(map) {
		map.off('click', this._onSwitch, this);
		map.removeLayer(this.marker);
	},
	_onSwitch: function(e) {
		if(this._map.hasLayer(this.marker))
			this.hide();
		else
			this.setLoc(e.latlng);
	},

	hide: function() {
		this._map.removeLayer(this.marker);
	},
	setLoc: function(latlng) {
		this.marker.setLatLng(latlng).addTo(this._map);
	}
});

