/*
	enable drag e drop sui marker, con maniglia
*/

L.Marker.include({

	drag: function() {

		if(this.draggable)
		{
			this.draggable = false;			
			this.dragging.disable();
			L.DomUtil.removeClass(this._icon, 'draggable');
			this.off('dragstart drag dragend');
			this._icon.removeChild(this._icon.getElementsByClassName('marker-handledrag')[0]);
		}
		else
		{
			this.draggable = true;			
			this.closePopup();
			this.dragging.enable();
			L.DomUtil.addClass(this._icon, 'draggable');
			this.setZIndexOffset(1000);
			L.DomUtil.create('div','marker-handledrag', this._icon);
			this
			.on('dragstart drag', function(e) {
				e.target.closePopup();
				L.DomUtil.addClass(e.target._icon, 'dragged');
			})
			.on('dragend', function(e) {
				L.DomUtil.removeClass(e.target._icon, 'dragged');
			});
		}
	}	
});
