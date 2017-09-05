/*
	default values for new models and data documents

	//TODO use https://atmospherejs.com/aldeed/simple-schema
*/
Kepler.schemas = {

	place: {
		name: '',	       //place title
		createdAt: '',	   //new Date() of place insert
		userId: '',	   	   //user to created it
		active:0,	       //place visible in map
		indoor:0,		   //is an indoor place
		loc: [],		   //coordinates lat,lng
		checkins: [],	   //users inside place	
		hist: [],		   //recents checkins
		desc: '',		   //place description
		warn: '',          //place warnings and dangers
		websites: [],	   //website url of place
		emails: [],		   //contanct emails for place
		source: {},		   //describe source of data
	},
	
	user: {
		name: '',		   //display name	
		username: '',	   //username used in urls
		createdAt: '',	   //new Date() of user insert
		emails: [], 
		profile: {},		//user data
		avatar: '',		   //user photo
		status: '',        //
		statusDefault: '', 
		statusConnection:'',
		mood: '',		   //status mood message, shown in profile

		gender: '',
		city: '',
		lang: 'it',
		loc: null,		   //current gps position
		loclast: null,	   //lat gps position
		checkin: null,	   //id Place where I am
		mob:0,			   //if my device is mobile
		friends: [],	   //ids users friends
		usersPending: [],  //ids users that I send request
		usersReceive: [],  //ids users that I receive request
		usersBlocked: [],  //ids users that I blocked
		hist: [],		   //last places visited
		source: {},		   //source of registration by single signon		
		settings: {
			map: {
				layer: null,
				center: null  //last center of map
			}
		}
	}
};
