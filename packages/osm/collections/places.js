//TODO
if(Meteor.isServer) {
	console.log('Osm: createIndex... osm.id');
	Places._ensureIndex({'osm.id':1});
}
