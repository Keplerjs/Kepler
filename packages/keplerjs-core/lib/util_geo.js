

Kepler.util.geo = {

	roundLoc: function(ll, prec) {
		prec = prec || 6; 
		return [ parseFloat(ll[0].toFixed(prec)), parseFloat(ll[1].toFixed(prec)) ];
	},

	roundBbox: function(bb, prec) {
		prec = prec || 6;
		return [ K.util.geo.roundLoc(bb[0], prec),
				 K.util.geo.roundLoc(bb[1], prec) ];
	},	

	deg2rad: function(deg) {
		return deg * (Math.PI/180);
	},

	meters2rad: function(m) {
		return (m/1000)/111.12;
	},
	
	distance: function(p1, p2) {
		if(!K.util.valid.loc(p1) || !K.util.valid.loc(p2))
			return 0;
		var deg2rad = K.util.geo.deg2rad,
			R = 6371797, // Radius of the earth in m
			dLat = deg2rad(p2[0]-p1[0]),  // deg2rad below
			dLon = deg2rad(p2[1]-p1[1]), 
			a = Math.sin(dLat/2) * Math.sin(dLat/2) +
				Math.cos(deg2rad(p1[0])) * Math.cos(deg2rad(p2[0])) * 
				Math.sin(dLon/2) * Math.sin(dLon/2),
			c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
		return Math.round(R * c);
	},
	
	contains: function (bb, ll) { // (LatLngBounds) or (LatLng) -> Boolean

		if(!K.util.valid.loc(ll)) return false;

		return L.latLngBounds(bb).contains(L.latLng(ll));
		//var GeoJSON = Package['geojson-utils'].GeoJSON;
		//return GeoJSON.pointInBoundingBox(bb, [ll[1],ll[0]]);
	},	

	sunrise: function(loc) { //alba
		return SunCalc.getTimes(new Date(), loc[0], loc[1]).sunrise
				.toLocaleTimeString().match(/([0-9]+):([0-9]+)/)[0];
	},

	sunset: function(loc) {	//tramonto
		return SunCalc.getTimes(new Date(), loc[0], loc[1]).sunset
				.toLocaleTimeString().match(/([0-9]+):([0-9]+)/)[0];
	},
	
	timeTrack: function(len, dis) {		//tempo percorrenza tracciati
		//http://ascoltotutti.blogspot.it/2012/12/calcolo-durata-di-un-percorso.html
		var km = len/1000,
			dif = dis>0 ? 4 : 6,	//fattore: salita/discesa
			ore = ( km + (Math.abs(dis)/100) ) / dif,
			sec = Math.round(ore*3600);
		return sec>60 ? sec : 0;
	},

	createPoint: function(ll) {
		return {
			"type": "Point",
			"coordinates": ll
		};
	},

	createFeature: function(type, coords, props) {
		props = props || {};
		coords = coords || [];
		return {
			"type": "Feature",
			"properties": props,
			"geometry": {
				"type": type,
				"coordinates": coords
			}
		};
	},

	createFeatureColl: function(ff) {
		return {
			"type": "FeatureCollection",
			"features": ff
		};
	},

	linestringLen: function(line) {
		var cc = line.coordinates, p, d = 0;
		for(var i=0; i<cc.length; i++)
		{
			if(i>0 && cc[i])
				d += K.util.geo.distance( [p[1], p[0]], [cc[i][1], cc[i][0]] );
			p = cc[i];
		}
		return d;
	},

	linestringClean: function(line) {	//remove duplicates coords
		var cc = line.coordinates,
			ncc = [];
		for(var i=0; i<cc.length; i++)
		{
			if( i>0 &&
				cc[i][0]===cc[i-1][0] &&
				cc[i][1]===cc[i-1][1])
				continue;
			ncc.push([parseFloat(cc[i][0]),parseFloat(cc[i][1])]);
		}
		line.coordinates = ncc;
		return line;
	},

	polylineLen: function(line) {	//line is L.Polyline
		var ll = line.getLatLngs(), d = 0, p = null;
		for(var i=0; i<ll.length; i++)
		{
			if(i) d += p.distanceTo(ll[i]);
			p = ll[i];
		}
		return d;
	},

	angleLocs: function(startLoc, endLoc) {

		var RAD2DEG = 0.017453,
			DEG2RAD = 57.2957795,
			dlat = endLoc[0] - startLoc[0],
			dlng = endLoc[1] - startLoc[1],
			ang = Math.atan2(dlng * Math.cos(endLoc.lat() * RAD2DEG), dlat)* DEG2RAD;

		if (ang >= 360)
			ang -= 360;
		else if (ang < 0)
			ang += 360;

		return ang;
	},

	randomLatLng: function(bb) {
		var sw = bb.getSouthWest(),
			ne = bb.getNorthEast(),
			lngs = ne.lng - sw.lng,
			lats = ne.lat - sw.lat;
		return new L.LatLng(
				sw.lat + lats * Math.random(),
				sw.lng + lngs * Math.random());
	}
};