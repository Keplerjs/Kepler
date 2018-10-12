/*

//TODO i18n for cats

Template.panelPlace_cats.helpers({
	placeCats: function() {
		return _.map(this.data.cats, function(cat) {
			return i18n('label_cats_place_'+cat) || cat;
		});
	}
});*/

Template.panelEdit_cats.helpers({
	allCats: function() {
		
		var placeCats = this.getCats(),
			activeCats = [];

		_.each(K.settings.public.categories.cats.place, function(v,k) {
			if(v){
				activeCats.push(k);
			}
		});

		return _.map(activeCats, function(c) {
			//console.log(c)
			return {
				val: c,
				name: c,//i18n('label_ors_'+p),
				active: _.contains(placeCats, c)
			};
		});
	}
});

Template.panelEdit_cats.events({
	
	'change #cats_edit input': _.debounce(function(e, tmpl) {
		e.preventDefault();

		var val = $(e.currentTarget).val(),
			liked = $(e.currentTarget).is(':checked');

		if(!liked)
			tmpl.data.removeCats(val);
		else
			tmpl.data.addCats(val);

	}, 300)
});