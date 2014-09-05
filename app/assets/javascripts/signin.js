$(document).ready(function() {

  $(".signin-button").on('click', function(event){
    event.preventDefault();

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
        var message = response.message
        $('.signin-form .error').show();
        $('.signin-form .error').text(message);
      });

    });
  });
});
