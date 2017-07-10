
K.Plugin({
	name: 'geoinfo',
	placeholders: {
		panelPlace: 'panelPlace_geoinfo',
		popupCursor: 'popupCursor_geoinfo'
	},	
	schemas: {
		place: {
			geoinfo: {
				loc: [],	//location
				ele: 0,		//elevation
				esp: 0,		//aspect
				near: '',	//near locality
				com: '',	//municipality
				prov: '',	//province
				reg: '',	//district
				naz: '',	//country
				//shadow
			}
		}
	},
	filters: {
		placePanel: {
			fields: {
				geoinfo: 1
			}
		}
	},
	settings: {
		cacheGeoinfo: true
	}
});