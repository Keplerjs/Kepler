
K.Osm.queryBuilder = function(options, loc) {

	//docs https://wiki.openstreetmap.org/wiki/Overpass_API/Overpass_API_by_Example
		
	var loc = K.Util.geo.locRound(loc),
		out = '',
		head = '[out:json];', //TODO [timeout:1];
		filter = '',
		tail = '',
		//bbox = '',
		types = ['node'],	//way,rel
		tags = ['~".*"~"."'],	//all values
		union = '(._;>;);';		//for grouping nodes
	
	var tmplId = '{type}({id});',
		tmplAround = '{type}(around:{dist},{lat},{lon})[{tag}];',
		//tmplBbox = '{type}({bbox})[{tag}];',
		tmplTail = 'out {meta};out geom;out {limit};',
		tmpl = tmplAround;

	var opts = _.defaults(options || {}, {
		id: '',
		types: types,
		tags: tags,
		dist: K.settings.osm.findByLocDist,
		limit: K.settings.osm.findByLocLimit,
		meta: K.settings.osm.overpassMeta
	});

	opts.tags = _.isArray(opts.tags) ? opts.tags : [opts.tags];
	opts.types = _.isArray(opts.types) ? opts.types : [opts.types];

	if(opts.id) {

		let osmid = opts.id.split('/');

		filter = K.Util.tmpl(tmplId, {
			type: osmid[0],
			id: osmid[1]
		});
	}
	else
	{
		filter = "(\n";
		
		_.each(opts.types, function(type) {
			_.each(opts.tags, function(tag) {
				filter += K.Util.tmpl(tmpl, {
					//bbox: bbox,
					lat: loc[0],
					lon: loc[1],
					dist: opts.dist,
					type: type,
					tag: tag
				})+"\n";
			});
		});

		filter += ");";
	}

	tail = K.Util.tmpl(tmplTail, {
		meta: opts.meta ? 'meta' : '',
		limit: opts.limit
	});

	out = [head, filter, union, tail].join("\n");

	console.log("Osm: queryBuilder\n", out,"\n");
	//console.log(out);

	return out;
};