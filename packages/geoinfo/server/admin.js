
if(K.Admin)
K.Admin.methods({
	removeAllGeoinfo: function() {
		
		if(!K.Admin.isMe()) return false;

		Places.update({},{
			$set:{
				geoinfo:{}
			}
		},{multi:true});
	},
	cleanAllGeoinfoCache: function() {
		
		if(!K.Admin.isMe()) return false;

		_.each(K.Geoinfo.fields, function(opt) {
			console.log('Geoinfo: cache clean ', opt.name);
			K.Cache.clean(opt.name);
		});
	},
	getIpInfo: function(ip) {
		
		if(!K.Admin.isMe()) return false;
		
		var info = K.Geoinfo.getIpInfo(ip);

		return info;
	},
	startUpdateAllGeoinfo: function(field, time) {
		
		time = time || 3000;

		if(!field) return 'specify field';
		//"loc","ele","esp","prov","near","com","reg","naz"
		var geofield = 'geoinfo.'+field,
			w = {},
			ff = {loc:true};

		w[geofield]= {
			$exists: false
		};
		ff[field] = true;
		
		var places = Places.find(w,{fields: {_id:1,name:1,loc:1}}).fetch(),
			i = 0;

		console.log('Geoinfo: startUpdateAllGeoinfo... '+places.length);
		
		K.Geoinfo.timer = Meteor.setInterval(function() {
			
			var place = places[i++];
			
			if(place) {
				var geoinfo = K.Geoinfo.getFieldsByLoc(place.loc, ff),
					f = {};
				if(geoinfo[field]) {
					f.loc = place.loc;
					f[geofield] = geoinfo[field];
					Places.update(place._id, {
						$set: f
					});
					console.log('Geoinfo: startUpdateAllGeoinfo',field, place.name)
				}
				else
					console.log('Geoinfo: startUpdateAllGeoinfo error', geoinfo);
			}
			else {
				Meteor.clearInterval(K.Geoinfo.timer);
				console.log('Geoinfo: startUpdateAllGeoinfo finish.', field);
			}
		}, time);
	},
	stopUpdateAllGeoinfo: function() {
		if(K.Geoinfo.timer)
		Meteor.clearInterval(K.Geoinfo.timer);
	console.log('Geoinfo: startUpdateAllGeoinfo.');
	}
});