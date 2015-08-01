

//TODO usare modulo di conversazioni!!
//inviando una nuova convers che contiene la falesia nel messaggio

Template.dialog_share.onCreated(function() {
	$('#dialog_share').modal();
});

Template.dialog_share.onRendered(function() {

//console.log('dialog_share rendered');

	 if(Session.get('dialogShareId'))
	 	$('#dialog_share').modal('show');

});

Template.dialog_share.helpers({
	place: function() {
		return Climbo.newPlace( Session.get('dialogShareId') );
	}
});
