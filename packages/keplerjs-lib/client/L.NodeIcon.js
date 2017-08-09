/*
	simile a L.DivIcon ma accetta come parametro un nodo DOM invece di html come testo!
	utile per inserire un nodo reattivo
	con animazione per evidenziare il marker nella map
*/

L.NodeIcon = L.Icon.extend({

	options: {
		iconSize: new L.Point(30, 30),
		iconAnchor: new L.Point(15, 30),
		popupAnchor: new L.Point(0, -30),
		className: 'leaflet-div-icon',
		nodeHtml: null
	},
	
	createIcon: function(oldIcon) {
		this.nodeHtml = oldIcon ? oldIcon : (this.options.nodeHtml || L.DomUtil.create('div'));
		this._setIconStyles(this.nodeHtml, 'icon');
		if(!this.anim)
			this.anim = L.DomUtil.create('div','marker-anim', this.nodeHtml);
		this.anim.style.display = 'none';
		return this.nodeHtml;
	},

	animate: function() {
		var self = this;
		if(!self.anim) return false;
		self.anim.style.display = 'block';
		setTimeout(function() {
			L.DomUtil.addClass(self.anim,'animated');
		});
		setTimeout(function() {
			L.DomUtil.removeClass(self.anim,'animated');
		}, 500);
		setTimeout(function() {
			self.anim.style.display = 'none';		
		}, 900);		
	},

	createShadow: function() {
		return null;
	}
});