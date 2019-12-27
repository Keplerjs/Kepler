
Meteor.startup(function() {

/*	if(Meteor.isServer)	//TODO uncomment when exists a 'debug mode'
		console.log("Core: METEOR_SETTINGS='"+JSON.stringify(Meteor.settings)+"'");
	*/
	_.deepExtend(K.settings, Meteor.settings);

	if(Meteor.isServer) {

		_.deepExtend(K.queries, K.settings.public.queries);

	}
	else if(Meteor.isClient) {
		
		K.settings = _.pick(K.settings,'public');

		var sets = K.settings.public.templates;

		for(var placeholder in K.templates) {
			
			var tmpls = K.templates[placeholder];

			for(var t in tmpls) {
				if(!Template[t]) {
					console.warn('Template not exists: "'+t+'", defined in plugin: '+(tmpls[t] && tmpls[t].plugin))
					delete tmpls[t];
				}
			}
		}

		for(var placeholder in sets) {

			if(sets[placeholder].show===false)
				delete K.templates[placeholder];

			if(!K.templates[placeholder]) continue;

			//TODO maybe use deepExtend
			_.extend(K.templates[placeholder], K.Plugin.normalizePlaceholders(sets[placeholder]) );
		}
	}
});
