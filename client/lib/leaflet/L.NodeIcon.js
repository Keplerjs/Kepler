/*
	simile a L.DivIcon ma accetta come parametro un nodo DOM invece di html come testo!
	utile per inserire un nodo reattivo
	con animazione per evidenziare il marker nella map
*/

L.NodeIcon = L.Icon.extend({

	options: {
		iconSize: new L.Point(27, 30),
		iconAnchor: new L.Point(13, 30),
		popupAnchor: new L.Point(0, -30),
		className: 'leaflet-div-icon',
		nodeHtml: null
	},
	
	createIcon: function(oldIcon) {
		this.options.nodeHtml = this.options.nodeHtml || document.createElement('div');
		var div = (oldIcon && oldIcon.tagName === 'DIV') ? oldIcon : this.options.nodeHtml;
		this._setIconStyles(this.options.nodeHtml, 'icon');
		this.anim = L.DomUtil.create('div','marker-anim', div);
		return div;
	},

	animate: function() {
		//$(this.anim).stop(true,true).show().delay(800).fadeOut(2000);
		$(this.anim)
			.stop(true,true)
			.show()
			.delay(200)
			.transition({scale:1.45})
			//.delay(100)
			.transition({scale:1})
			.fadeOut(900)
	},

	createShadow: function() {
		return null;
	}
});

L.nodeIcon = function (options) {
	return new L.NodeIcon(options);
};
