$(document).ready(function() {

  $(".signup-button").on('click', function(event){
    event.preventDefault();

    $('.signup-form').bPopup({
        modalClose: false,
        opacity: 0.6,
        positionStyle: 'fixed',
        modalColor: '#CFDBC5',
        modalClose: true//'fixed' or 'absolute'
      });

    $('.signup-form button').on('click', function(event){
        var username = $(".signup-form input[name*='username']").val();
        var email = $(".signup-form input[name*='email']").val();
        var password = $(".signup-form input[name*='password']").val();
        var passwordConfirmation = $(".signup-form input[name*='password_confirmation']").val();


        var request = $.ajax({
        url: "/users",
        type: "POST",
        data: {user: {username: username, email: email, password: password, password_confirmation: passwordConfirmation} },
        dataType: "json"
        });

      request.done(function(response){
        //successful signup
        if (response.success === 0){
          var message = response.message;
          $('.signup-form .message').show();
          $('.signup-form .message').text(message);
          $('.continue-button.signup').show();
          $('.signup-form button').hide();
          $('.center').hide();
          $('.close-button.signup').hide();
          $(".signin-button").hide();
          $(".signup-button").hide();
          $(".logout-button").show();
          $(".signup-form input[name*='username']").val("");
          $(".signup-form input[name*='email']").val("");
          $(".signup-form input[name*='password']").val("");
          $(".comment-button").show();
          $('.style-choose-photo').show();
          $(".choose-photo").show();
          $(".signup-form").bPopup().close();
        }
        //unsucessful signup
        else if (response.success === 1){
          var message = response.message;
          $('.signup-form .message').show();
          $('.signup-form .message').text(message);
          $('.signup-form .message').css("color","red");
          $(".signup-form input[name*='password']").val("");
        }
      });
      return request;
      });
    });
  
  $(".close-button.signup").on('click', function(){
    event.preventDefault();
    $(".signup-form").bPopup().close();
  });

});
    


