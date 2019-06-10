
Template.place_btn_checkin.events({
	'click .place-btn-checkin': function(e, tmpl) {
		if(this.isCheckin())
			K.Profile.removeCheckin(this.id);
		else
			K.Profile.addCheckin(this.id);
	}
});



Template.place_btns.events({
	'click .place-btn-map': function(e, tmpl) {
		e.preventDefault();
		this.showLoc();
	}
});
Template.item_place_search.events({
	'click .place-btn-map': function(e, tmpl) {
		e.preventDefault();
		this.showLoc();
	}
});