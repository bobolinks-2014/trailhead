$(document).ready(function() {

  if (window.matchMedia("(min-width: 77.8em)").matches){
  $(".trail-carousel").slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 600
  });
  }
  else if (window.matchMedia("(min-width: 52.8em)").matches){
  $(".trail-carousel").slick({
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    speed: 600
  });
  }
  else {
  $(".trail-carousel").slick({
	  infinite: true,
	  slidesToShow: 1,
	  slidesToScroll: 1,
    speed: 600
  });
  }
});
