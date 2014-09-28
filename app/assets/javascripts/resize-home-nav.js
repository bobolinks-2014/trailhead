$(document).ready(function(){
	if (window.location.pathname === "/" && $(window).height() < 650){
		var newHeight = $(window).height() - 70 - 50;
		$('.home').css('height', newHeight);
		if (newHeight < 450) {
			$('.home').css('font-size', '0.7em');
		} else if (newHeight < 500){
			$('.home').css('font-size', '0.8em');
		} else if (newHeight < 525){
			$('.home').css('font-size', '0.9em');
		};
	};
});