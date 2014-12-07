
jQuery.fn.expandTextarea = function (maxH) {
	//OPPURE https://atmospherejs.com/package/jquery-autosize
	maxH = maxH || 64;
	$(this).on('keydown keyup change focus', function(e) {
		var this$ = $(this);
		this$.css({overflow: 'hidden', height: ''});
		var scrollHeight = this$.prop('scrollHeight'),
			outerHeight = this$.outerHeight(),
			innerHeight = this$.innerHeight(),
			magic = outerHeight - innerHeight - 10;
		//console.log(scrollHeight, magic);
		this$.height( Math.min(scrollHeight + magic, maxH) );
	});
	return this;
}