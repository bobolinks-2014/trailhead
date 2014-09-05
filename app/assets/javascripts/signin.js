$(document).ready(function() {

  $(".signin-button").on('click', function(event){
    event.preventDefault();
    $('.signin-form .error').hide();

    $('.signin-form').bPopup({
        modalClose: false,
        opacity: 0.6,
        positionStyle: 'fixed',
        modalColor: '#CFDBC5',
        modalClose: true//'fixed' or 'absolute'
      });

    $('.signin-form button').on('click', function(event){
      var email = $(".signin-form input[name*='email']").val();
      var password = $(".signin-form input[name*='password']").val();

      var request = $.ajax({
        url: "/sessions",
        type: "POST",
        data: {email: email, password: password},
        dataType: "json"
      });

      request.done(function(response){
        if (response.success === 0){
          var message = response.message;
          $('.signin-form .message').show();
          $('.signin-form .message').text(message);
          $('.signin-form .message').css("color","green");
          $(".signin-form input[name*='email']").val("");
          $(".signin-form input[name*='password']").val("");
        }
        else if (response.success === 1){
          var message = response.message;
          $('.signin-form .message').show();
          $('.signin-form .message').text(message);
          $('.signin-form .message').css("color","red");
          $(".signin-form input[name*='password']").val("");
        }
      });

    });
    });
  $(".close-button").on('click', function(){
    $(".signin-form").bPopup().close();
  });
});
