
if(K.Admin)
K.Admin.methods({
	cleanAllStatsCache: function() {
		
		if(!K.Admin.isMe()) return false;

		console.log('Stats: cache clean ');
		K.Cache.clean('stats');

	},
});