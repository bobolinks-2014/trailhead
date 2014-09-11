$(document).ready(function(){

	var $window = $(window);

  function checkWidth() {
      var windowsize = $window.width();
      if (windowsize < 600) {
          
             // debugger
          }
      
      }
    
    
    checkWidth();
 
    $(window).resize(checkWidth);

});