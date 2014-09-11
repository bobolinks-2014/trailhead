$(document).ready(function(){

	$('.create-trail-button').on('click', function(event){
		event.preventDefault();
		$('.home-top').slideUp();
		$('.create-trail-info').hide();
		$('.create-trail-button').hide();
		$('.all-trails-button').hide();
		$('.trail-form').show();
	});
	$('.submit-create-trail').on('click', function(event){
		event.preventDefault();
		$('.home-top').slideDown();
		$('.create-trail-button').show();
		$('.all-trails-button').show();
		$('.create-trail-info').show();
		$('.trail-form').hide();
	});

	$('.cancel-create-trail').on('click', function(event){
		event.preventDefault();
		$('.home-top').slideDown();
		$('.create-trail-button').show();
		$('.all-trails-button').show();
		$('.create-trail-info').show();
		$('.trail-form').hide();
	});


});