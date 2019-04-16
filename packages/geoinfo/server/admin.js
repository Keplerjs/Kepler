
if(K.Admin)
K.Admin.methods({
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
	}
});