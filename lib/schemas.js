
Climbo.schemas.place = {
	loc: [],		//posizione lat,lng
	name: '',	    //place title
	type: '',	    //rock	indoor	boulder	long
	active: 0,	    //place visibile
	rank: 0,		//sommati di tutti i preferiti degli utenti
	ele: 0,		    //elevazione
	esp: 0,		    //esposione	 azimut
	naz: '',		//nazione
	near: '',	    //localita
	reg: '',		//regione
	checkins: [],	//utenti in place	
	hist: [],		//checkins recenti
	convers: [],	//ids conversazioni in bacheca
	sectors: [],	//elenco id dei settori	
	photos: [],	    //elenco id delle foto
	tracks: -1,		//numero tracce
	pois: -1,		//numero pois
};

Climbo.schemas.user = {
	name: '',		   //display name	
	username: '',	   //username used in urls
	emails: [], 
	avatar: '',
	gender: '',
	lang: '',
	city: '',
	likeplaces: [],	   //(TODO rename in types) tipologia climber i18n.places
	loc: null,		   //current gps position
	loclast: null,	   //lat gps position
	locmap: null,	   //last center of map
	checkin: null,	   //id Place where I am
	online: 0,		   //stato di visibilita rispetto ai miei friends
	onlinelast: null,  //last online status datetime
	mob: 0,			   //if my device is mobile
	notif: [],		   //notifiche, messaggi non letti, eventi in places preferite, nuovi friends	
	favorites: [],	   //id place preferiti		
	friends: [],	   //ids users friends
	usersPending: [],  //ids users that I send request
	usersReceive: [],  //ids users that I receive request
	usersBlocked: [],  //ids users that I blocked
	convers: [], 	   //ids conversations publics and privates
	hist: [],		   //last places visited
	events: [],		   //places in calendar
	settings: {}	   //user custom settings
};