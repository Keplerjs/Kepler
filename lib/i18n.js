//TODO convertire in file json o document mongo e dividere in lingue
//creare dir /lib/i18n/it.json, en.json, ...

//use a method that return i18n texts

i18n.map('it', {
	months_short: ",Gen,Feb,Mar,Apr,Mag,Giu,Lug,Ago,Set,Ott,Nov,Dic",
	months:	",Gennaio,Febbraio,Marzo,Aprile,Maggio,Giugno,Luglio,Agosto,Settembre,Ottobre,Novembre,Dicembre",
	days_short: ",Lun,Mar,Mer,Gio,Ven,Sab,Dom",
	days: "Domenica,Lunedi,Martedi,Mercoledi,Giovedi,Venerdi,Sabato",
	days_name: {
		"-1": "Ieri", "0": "Oggi", "1": "Domani"
	},
	times: {
		y: "anno,anni", m: "mese,mesi", d: "giorno,giorni", h: "ora,ore", i: "min,min", s: "sec,sec", ago: "fà"
	},
	times_short: {
		y: "y", m: "m", d: "d", h: "h", i: "m", s: "s"
	},
	words: {
		and: "e", from: "da", to: "a"
	},
	azimuth: 
		"Nord,Nord-NordEst,Nord-Est,Est-NordEst,Est,Est-SudEst,Sud-Est,Sud-SudEst,Sud,Sud-SudOvest,Sud-Ovest,Ovest-SudOvest,Ovest,Ovest-SudOvest,Nord-Ovest,Nord-NordOvest,Nord",
	azimuth_short:
		"north,nne,ne,ene,east,ese,se,sse,south,ssw,sw,wsw,west,wnw,nw,nnw,north",
	errors: {
		imageNotValid: "Immagine non valida, JPG/PNG, max "
	},
	ui: {
		titles: {
			settings: "Impostazioni",
			favorites: "Luoghi preferiti",
			convers: "Messaggi",
			notifs: "Notifiche",
			conver: "Conversazione",
			placeConvers: "Bacheca di {name}",			
			checkins: "Climbers a",
			sectors: "Settori a"
		},
		alerts: {
			gpson: "Gli amici ora posso vedere la tua posizione!",
			usergps: "<b>{name}</b> ha attivato il suo gps",
			useronline: "<b>{name}</b> è online",
			usercheckin: "<b>{name}</b> è arrivato a <b>{placename}</b>",
			placecheckins: "<b>{users}</b> climbers a <b>{name}</b>",
			userleaveconv: "<i class=\"text-muted\"> <b>{name}</b> ha lasciato la conversazione.</i>",
		},
		tabs: {
			geo: "Geografia",
			gpx: "Avvicinamento",
			pois: "Luoghi utili",
			forecasts: "Previsioni meteo",
			stview: "Street View"
		},
		btns: {
			checkin: "Sei qui!",
			uncheckin: "Sei qui?",
			wall: "Bacheca",
			sectors: "Settori",
			share: "Invia",
			info: "Info",
			hist: "Attività",
			weather: "Meteo",
			photos: "Foto",
			nav: "Naviga",
			stview: "Vista dal parcheggio",
			notif: "Notifiche",
			favs: "Preferiti",
			friends: "Amici", 
			events: "Eventi",
			bid: "Invita",
			conversend: "Messaggio",
			addfriend: "Aggiungi",
			delfriend: "Rimuovi",
			convers: "Messaggi",
			profile: "Profilo",
			friends: "Amici",
			sets: "Impostazioni",
			msgsend: "Invia",
			convernew: "Nuova",
			converdel: "Cancella!",
			closeall: "chiudi tutti",
			avatar: "Cambia foto",
			verify: "Verifica...",
			verified: "Verificata",
			logout: "Esci",
			home: "Homepage",
			enter: "Entra",
			signup: "Registrati",
			signin: "Login",
			signinfb: "Registrati con Facebook",
			signingp: "Registrati con Google",
			forgotpw: "Password persa?"
		},
		labels: {
			noname: "senza nome",
			type: "Tipo",
			descr: "Descrizione",
			loc: "Località",
			reg: "Regione",
			prov: "Provincia",
			com: "Comune",
			esp: "Esposizione",
			season: "Stagione",
			shadow: "In ombra",
			ele: "Quota",
			sunrise: "Alba",
			sunset: "Tramonto",
			time: "Durata",
			len: "Distanza",
			asc: "In salita",
			desc: "In discesa",
			friendscomm: "Amici in comune",
			friendsother: "Altri amici",
			findusers: "Cerca persone...",
			msgnew: "Scrivi un commento...",
			msgsmore: "commenti...",
			convertit: "Titolo nuova conversazione...",
			signupdate: "Registrato da",
			name: "Nome",
			username: "Username",
			email: "Email",
			city: "Città",
			account: "Account",
			likeplaces: "Tipologia",
			userplace: "Si trova qui",
			histplaces: "Luoghi recenti",
			favsplaces: "Luoghi preferiti",
			eventsplaces: "Luoghi in programma",
			nofriendscomm: "Nessun amico in comune",
			nohist: "Nessun luogo di recente",
			nofavs: "Nessun luogo preferito",
			noevents: "Nessun luogo in programma",
			nophotos: "Nessuna foto del luogo",
			nohistplace: "Nessuna visita di recente"
		},
		pois: {
			place: "Arrivo",
			parking: "Parcheggio",
			water: "Fontana",
			drink: "Dove bere!",
			eat: "Dove mangiare"
		},
		places: {
			rock: "Falesia",
			boulder: "Bouldering",
			indoor: "Palestra",
			long: "Via lunga",	//TODO cambiare in 'route'
			ice: "Ghiaccio",	
			iron: "Via ferrata",
			water: "Deep water",
			trad: "Via Tradizionale",
			dry: "Dry Tooling",			
			bigwall: "Big wall",
			building: "Buildering",
			pool: "Climbing gym",
			alp: "Alpinismo",
			club: "Associazione Sportiva",
			market: "Negozio"
		},
		controls: {
			attrib: "&copy;<small>2014</small> Climbo.net, map data <a href=\"http://osm.org/\">osm.org</a>",
			search: {
				text: "Cerca un luogo...",
				error: "Falesia non trovata"
			},
			gps: {
				title: "Mostra la tua posizione",
				error: "GPS disabilitato"
			}
		},
		layers: {
			road: "Stradale",
			land: "Rilievi",
			sat: "Satellite"
		}
	},
	pkgs: {
		accountsUIBootstrap3: {
			loginButtonsLoggedOutPasswordService: {
				create: "Crea",
				signIn: "Accedi",
				forgot: "Password dimenticata?",
				createAcc: "Crea un account"
			}
		}
	}
});