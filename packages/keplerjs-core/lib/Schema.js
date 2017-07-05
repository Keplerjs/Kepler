/*
	default values for new model/document
*/
Kepler.Schema = {

	place: {
		name: '',	       //place title
		type: '',	       //place tipology
		active: 0,	       //place visible in map
		rank: 0,		   //sum of all users's favorites
		loc: [],		   //coordinates lat,lng
		desc: '',		   //place description
		warn: '',          //place warnings and dangers

//TODO move into geo property
		ele: 0,		       //elevation
		esp: 0,		       //aspect
		near: '',	       //near locality
		com: '',		   //municipality
		prov: '',		   //province
		reg: '',		   //district
		naz: '',		   //country		
		//shadow:'',       

		checkins: [],	   //users inside place	
		hist: [],		   //recents checkins
		event: [],		   //calendar events
		convers: [],	   //conversations in place

		source: {
			type: 'osm',
			//node id, user, tags
		}
	},

	user: {
		name: '',		   //display name	
		username: '',	   //username used in urls
		emails: [], 
		avatar: '',
		status: '',        //status mood message, shown in profile
		gender: '',
		city: '',
		lang: 'it',
		likeplaces: [],	   //(TODO rename in types) tipologia climber i18n.places					
		loc: null,		   //current gps position
		loclast: null,	   //lat gps position
		checkin: null,	   //id Place where I am
		online: 0,		   //stato di visibilita rispetto ai miei friends
		onlinelast: null,  //last online status datetime
		mob: 0,			   //if my device is mobile
		notif: [],		   //notifications, messaggi non letti, eventi in places preferite, nuovi friends	
		favorites: [],	   //id place preferiti		
		friends: [],	   //ids users friends
		usersPending: [],  //ids users that I send request
		usersReceive: [],  //ids users that I receive request
		usersBlocked: [],  //ids users that I blocked
		convers: [], 	   //ids conversations publics and privates
		hist: [],		   //last places visited
		event: [],		   //places in calendar
		isAdmin: 0,		   //if user is an admin
		settings: {
			map: {
				layer: null,
				center: null  //last center of map
			}
		}
	},

	conver: {
		title: '',         //Topic for the place wall or subject for the private convers
		targetId: '',      //if null is a private users convers		
		targetType: '',	   //type of target: user, place, event, pois		
		userId: '',        //owner/sender of conversation		
		usersIds: [],      //participants users
		lastMsg: null      //include last msg of conversation
	},

	converMsg: {
		updateAt: '',	
		convId: '',
		userId: '',
		body: ''
	}
};
