

Template.panelPlace_share.helpers({
	shareUrls: function() {

		var loc = {
			zoom: 15,
			lat: this.loc[0],
			lon: this.loc[1]
		};

		//https://stackoverflow.com/questions/23232273/is-there-a-way-to-invoke-navigation-from-mobile-browser
		return {
			default: K.Util.tmpl("geo:{lat},{lon}", loc),
			google: K.Util.tmpl("https://www.google.com/maps/search/?api=1&query={lat},{lon}", loc),
			apple: K.Util.tmpl("http://maps.apple.com/?ll={lat},{lon}", loc),
			osm: K.Util.tmpl("http://osm.org/?mlat={lat}&amp;mlon={lon}#map={zoom}/{lat}/{lon}", loc),
			//TODO bing: K.Util.tmpl("http://maps.live.com/default.aspx?v=2&amp;cp={lat}~{lon}&amp;style=h", loc),
		};

	}
});

Template.panelPlace_share.onRendered(function() {
	var self = this;
	new Clipboard(self.find('.btn-share'), {
		/*target: function() {
			return self.find('.btn-share');
		}*/
	}).on('success', function() {
		self.$('.btn-share').tooltip({title: i18n('btn_copied') }).tooltip('show');
		self.$('.input-share').blur()
	})
});

/*
Google Maps
	http://maps.google.com/maps?ll={lat},{lon}&amp;spn=0.5,0.5&amp;t=m&amp;q={lat},{lon}	Mappa
	http://maps.google.com/maps?ll={lat},{lon}&amp;spn=0.5,0.5&amp;t=k&amp;q={lat},{lon}	Satellite
	http://maps.google.com/maps?ll={lat},{lon}&amp;spn=0.5,0.5&amp;t=h&amp;q={lat},{lon}	Ibrida
	http://maps.google.com/maps?ll={lat},{lon}&amp;spn=0.5,0.5&amp;t=p&amp;q={lat},{lon}	Terreno

MapQuest
	http://www.mapquest.com/?center={lat},{lon}&amp;zoom={zoom}&amp;q=Valdinferno

Yahoo! Maps
	http://maps.yahoo.com/#mvt=m&amp;lat={lat}&amp;lon={lon}&amp;mag=6&amp;q1={lat},{lon}
	http://maps.yahoo.com/#mvt=s&amp;lat={lat}&amp;lon={lon}&amp;mag=6	Satellite
	http://maps.yahoo.com/#mvt=h&amp;lat={lat}&amp;lon={lon}&amp;mag=6	Ibrida

Maps-For-Free
	http://maps-for-free.com/?val={lat},{lon},{zoom},Valdinferno

Bing Mappe
	http://maps.live.com/default.aspx?v=2&amp;cp={lat}~{lon}&amp;style=r&amp;lvl={zoom}&amp;sp=Point.{lat}_{lon}
	http://maps.live.com/default.aspx?v=2&amp;cp={lat}~{lon}&amp;style=a&amp;lvl={zoom}&amp;sp=Point.{lat}_{lon}	Satellite
	http://maps.live.com/default.aspx?v=2&amp;cp={lat}~{lon}&amp;style=h&amp;lvl={zoom}&amp;sp=Point.{lat}_{lon}	Ibrida
	http://maps.live.com/default.aspx?v=2&amp;cp={lat}~{lon}&amp;style=o&amp;lvl={zoom}&amp;sp=Point.{lat}_{lon}	Obliqua

TerraServer
	http://www.terraserver.com/view.asp?cx={lon}&amp;cy={lat}&amp;proj=4326&amp;mpp=2.5&amp;pic=img	Satellite

WikiMapia
	http://www.wikimapia.org/#lat={lat}&amp;lon={lon}&amp;spnx=0.5&amp;spny=0.5&amp;m=m
	http://www.wikimapia.org/#lat={lat}&amp;lon={lon}&amp;spnx=0.5&amp;spny=0.5&amp;m=s	Satellite
	http://www.wikimapia.org/#lat={lat}&amp;lon={lon}&amp;spnx=0.5&amp;spny=0.5&amp;m=h	Ibrida
	http://www.wikimapia.org/#lat={lat}&amp;lon={lon}&amp;spnx=0.5&amp;spny=0.5&amp;m=t	Terreno

OpenStreetMap
	http://www.openstreetmap.org/index.html?mlat={lat}&amp;mlon={lon}&amp;zoom={zoom}

Here.com
	http://here.com/{lat},{lon},{zoom},0,0,normal.day

Flash Earth
	http://www.flashearth.com/?lat={lat}&amp;lon={lon}&amp;z=15&amp;r=0&amp;src=ggl	Satellite

ACME Mapper
	http://mapper.acme.com/?ll={lat},{lon}&amp;z=13&amp;t=M&amp;marker0={lat},{lon},Valdinferno
	http://mapper.acme.com/?ll={lat},{lon}&amp;z=13&amp;t=S&amp;marker0={lat},{lon},Valdinferno	Satellite
	http://mapper.acme.com/?ll={lat},{lon}&amp;z=13&amp;t=H&amp;marker0={lat},{lon},Valdinferno	Ibrida
	http://mapper.acme.com/?ll={lat},{lon}&amp;z=13&amp;t=T&amp;marker0={lat},{lon},Valdinferno	Topografia

GeaBios
	http://www.geabios.com/html/services/maps/PublicMap.htm?lat={lat}&amp;lon={lon}&amp;fov=0.5&amp;title=Valdinferno	Satellite

Blue Marble Navigator
	http://www.blue-marble.de?lon={lon}&amp;nlat={lat}&amp;borders&amp;geonames&amp;townnames&amp;zoom&amp;overlay=14&amp;base=7	Satellite
	http://www.blue-marble.de?lon={lon}&amp;nlat={lat}&amp;borders&amp;geonames&amp;townnames&amp;zoom&amp;overlay=7&amp;base=14">Luc	notturne

GeoNames
	http://www.geonames.org/maps/google_{lat}_{lon}.html	Ibrida

Fourmilab
	http://www.fourmilab.ch/cgi-bin/uncgi/Earth?imgsize=320&amp;opt=-l&amp;lat={lat}&amp;ns=North&amp;lon=-{lon}&amp;ew=West&amp;alt=71&amp;img=nasa.evif	Satellite

Norkart Virtual Globe
	http://www.virtual-globe.info/VirtualGlobeStarter.php?request=page&amp;dataset=http://www.virtual-globe.info/globe.vgml&amp;lookat={lon},{lat},500000	Satellite

MapTech
	http://mapserver.maptech.com/homepage/index.cfm?lat={lat}&amp;lon={lon}&amp;scale=24000&amp;zoom=50&amp;type=1

Geody
	http://www.geody.com/geolook.php?world=terra&amp;lat={lat}&amp;lon={lon}	Info

GPS Visualizer
	http://www.gpsvisualizer.com/map?form=wikipedia&amp;format=google&amp;sp_width=50km&amp;form.data=type,name,latitude,longitude%0DW,%22Valdinferno%22,{lat},{lon}

Degree Confluence Project
	http://www.confluence.org/confluence.php?lat=44&amp;lon=8	Info

Shaded Relief
	http://www.shaded-relief.com/?gt={lat}&amp;gl={lon}&amp;z=9&amp;t=4
*/