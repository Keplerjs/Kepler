
Router.map(function() {

	this.route('shareLoc', {
		path: '/map/:lat,:lng',
		template: 'empty',
		layoutTemplate: 'layoutMap',
		waitOn: function() {
			Session.set('showSidebar', false);
		},
		onAfterAction: function() {
			if(!this.ready()) return null;
			
			var loc = K.Util.geo.roundLoc([this.params.lat, this.params.lng]);

			K.Map.showLoc(loc, function() {
				K.Map.showCursor(loc);
			});
		}
	});
	
});