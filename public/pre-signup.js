//$(function() {

//$("#page-intro").on('pageshow', function() {
$(document).on('pageinit',function() {
    
	$('#logo,#start').one('click', function() {
		$('#start').hide();
		$('#notif').fadeIn('slow');
	});
	
	$('#form-notif').submit(function() {
		if( $('#email').val() )
			$.getJSON(Climbo.urls.ajax.action, {
					presignup: $('#email').val()
				}, function(json) {
					if(json.ok)
					{
						$('#notif').hide();
						$('#preferit').fadeIn('slow');
					}
					else
						$('#email').focus();
				});
		else
			$('#email').focus();
		return false;
	});

	$('#submit-rank').parent().hide();
	
	$('#search-place').on('keydown', function() {
		if($(this).val().length > 3)
			$('#submit-rank').parent().show();
		else
			$('#submit-rank').parent().hide();
	})
	.autocomplete({
	//TODO abilita cache!!
		termParam: 'name',
		source: Climbo.urls.ajax.findName,
		//link: 'target.html?term=',
		target: $('#suggestions'),
		minLength: 1,
		icon: 'check',
		labelHTML: function(value) {
			var vv = value.split(',');
			return '<b>'+vv[0]+'</b> <i>'+vv[1]+'</i>';
		},
		callback: function(e) {
			var val = $(e.currentTarget).find('b').text().split(',')[0];

			$('#search-place').val( val ).trigger('keydown');
			$('#search-place').autocomplete('clear');
			$('#submit-rank').show().focus();
		}
	});

	$('#form-rank').on('submit',function(e) { e.preventDefault(); return false;});
	
	$('#submit-rank').on('click',function(e) {
		e.stopPropagation();
		e.preventDefault();

		$.get(Climbo.urls.ajax.action,
			{
			 incrank: $('#search-place').val(),
			 user: $('#email').val()
			},
			function(resp){
			console.log(resp);
				if(resp.ok)
				{
					
					$('#search-place').val('').trigger('keydown');
					$('#alert-rank').html('<h4>ti piace solo '+resp.msg+'?<h4>');//.show();
					//setTimeout(function() {$('#alert-rank').fadeOut('slow');},2000);					
				}
			});

		return false;
	});

	//});//pagecreate
});

