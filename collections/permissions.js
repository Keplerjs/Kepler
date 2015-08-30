/*
	definitions of fields in pubblications
*/
Climbo.perms = {
	currentUser: {
		name:1,username:1,avatar:1,friends:1,createdAt:1,likeplaces:1,gender:1,city:1,checkin:1,online:1,loc:1,mob:1,loclast:1,onlinelast:1,favorites:1,events:1,hist:1,locmap:1,emails:1,lang:1,notif:1,convers:1,settings:1
	},
//Users
	friendPanel: {
		name:1,username:1,avatar:1,friends:1,createdAt:1,likeplaces:1,gender:1,city:1,checkin:1,online:1,loc:1,mob:1,loclast:1,onlinelast:1,favorites:1,events:1,hist:1
	},
	userPanel: {
		name:1,username:1,avatar:1,friends:1,createdAt:1,likeplaces:1,gender:1,city:1
	},	
	friendItem: {
		name:1,username:1,avatar:1,/*************************************************/checkin:1,online:1,loc:1,mob:1
	},
	userItem: {
		name:1,username:1,avatar:1
	},
//Places
	placePanel: {
		loc:1,name:1,type:1,near:1,rank:1,checkins:1,tracks:1,pois:1,convers:1,com:1,prov:1,reg:1,desc:1,warn:1,ele:1,esp:1,naz:1,hist:1,photos:1,sectors:1//,source: 1
	},
	placeMarker: {
		loc:1,name:1,type:1,near:1,rank:1,checkins:1,tracks:1,pois:1,convers:1
	},	
	placeItem: {
		loc:1,name:1,type:1,near:1,rank:1,checkins:1
	},
	placeSearch: {
		loc:1,name:1,type:1,near:1,rank:1,/*******************************/prov:1,reg:1
	},
//Convers
	converDialog: {
		title:1,updateAt:1,placeId:1,userId:1,lastMsg:1,usersIds:1
	},
	converItem: {
		title:1,updateAt:1,placeId:1,userId:1,lastMsg:1,usersIds:1
	}
};
