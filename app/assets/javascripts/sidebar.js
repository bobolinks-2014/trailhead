$(document).ready(function(){

	$('.create-trail-button').on('click', function(event){
		event.preventDefault();
		$('.home-top').slideUp();
		$('.create-trail-button').hide();
		$('.trail-form').show();
	});
	$('.trail-form').on('click', 'button', function(event){
		event.preventDefault();
		$('.home-top').slideDown();
		$('.create-trail-button').show();
		$('.trail-form').hide();
	});


});