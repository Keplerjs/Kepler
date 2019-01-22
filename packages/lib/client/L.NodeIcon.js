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
		this.nodeHtml = oldIcon ? oldIcon : (this.options.nodeHtml || L.DomUtil.create('div',this.options.className));
		this._setIconStyles(this.nodeHtml, 'icon');
		return this.nodeHtml;
	},

	animate: function() {
		var self = this;
		this.$anim = $(this.nodeHtml).find('.marker-anim');
		self.$anim.show();
		setTimeout(function() {
			self.$anim.addClass('animated');
		});
		setTimeout(function() {
			self.$anim.removeClass('animated');
		}, 500);
		setTimeout(function() {
			self.$anim.hide();
		}, 900);		
	},

	createShadow: function() {
		return null;
	}
});
