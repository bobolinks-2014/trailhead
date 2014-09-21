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
      event.preventDefault();
      var email = $(".signin-form input[name*='email']").val();
      var password = $(".signin-form input[name*='password']").val();

      var request = $.ajax({
        url: "/sessions",
        type: "POST",
        data: {user: {email: email, password: password } },
        dataType: "json"
      });

      request.done(function(response){
        //successful signin
        if (response.success === 0){
          var message = response.message;
          $(".signin-form input[name*='email']").val("");
          $(".signin-form input[name*='password']").val("");
          $(".signin-button").hide();
          $(".signup-button").hide();
          $(".logout-button").show();
          $(".comment-button").show();
          $('.style-choose-photo').show();
          $(".choose-photo").show();
          $(".trail-form-signin-message").hide();
          $(".submit-create-trail").show();
          $(".signin-form").bPopup().close();
        }
        //unsuccessful signin
        else if (response.success === 1){
          var message = response.message;
          $('.signin-form .message').show();
          $('.signin-form .message').text(message);
          $('.signin-form .message').css("color","red");
          $(".signin-form input[name*='password']").val("");
        }
        return request;
      });
    });
  });

  $(".close-button.signin").on('click', function(){
    $(".signin-form").bPopup().close();
  });
});
