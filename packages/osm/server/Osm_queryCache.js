

//TODO
//
//
Kepler.Osm.queryCache = function(bb) {

	let w = bb.getWest(),
		e = bb.getEast(),
		s = bb.getSouth(),
		n = bb.getNorth();

	let prec = 2,
		int = 1/(Math.pow(10,prec));

	function fix(n) {
		return parseFloat(n.toFixed(prec))
	}

	let W = fix(w);
	let E = fix(e);
	let S = fix(s);
	let N = fix(n);

	W = w<W ? W-int : w;
	E = e>E ? E+int : e;
	S = s<S ? S-int : s;
	N = n>N ? N+int : n;

	var rects = [];

	for(let x = W; x<E; x+=int) {

		x = fix(x)
		
		for(let y = S; y<N; y+=int) {

			y = fix(y)

			let loc = [y , x],
				loc2 = [fix(y+int), fix(x+int)];

			rects.push([loc, loc2]);
		}
	}
	
	return rects;
};