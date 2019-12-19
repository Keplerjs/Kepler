
//L.Cursor = L.Class.extend({	//leaflet 0.7.7
L.Cursor = L.Layer.extend({
	//includes: L.version[0] =='1' ? L.Evented.prototype : L.Mixin.Events,
	
	options: {
		className: 'leaflet-div-icon',
		event: 'click'
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
		var self = this;
		this._map = map;		
		this._map.on(this.options.event, this._onSwitch, this);
		this._map.on('zoomstart', function(e) {
			if(this.marker.getPopup())
				this.marker.closePopup()
		}, this);
	},
	onRemove: function(map) {
		map.off(this.options.event, this._onSwitch, this);
		map.removeLayer(this.marker);
	},
	_onSwitch: function(e) {

		if(this._map.hasLayer(this.marker))
			this.hide();
		else
			this.setLoc(e.latlng);
	},

	hide: function() {
		if(this._map)
			this._map.removeLayer(this.marker);
	},
	setLoc: function(latlng) {
		this.marker.setLatLng(latlng).addTo(this._map).openPopup();
	}
});

